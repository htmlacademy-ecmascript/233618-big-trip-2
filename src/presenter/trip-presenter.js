import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import {
  sortPointsByDate,
  sortPointsByTime,
  sortPointsByPrice,
} from '../utils/point.js';

export default class TripPresenter {
  #tripListComponent = new TripListView();
  #noPointComponent = new NoPointView();
  #sortComponent = null;
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DATE;

  constructor({ tripContainer, pointsModel, offersModel, destinationsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#pointsModel.points.sort(sortPointsByDate)];
      case SortType.TIME:
        return [...this.#pointsModel.points.sort(sortPointsByTime)];
      case SortType.PRICE:
        return [...this.#pointsModel.points.sort(sortPointsByPrice)];
    }

    return this.#pointsModel.points;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderTrip();
  }

  #renderTrip() {
    render(this.#tripListComponent, this.#tripContainer);

    const points = this.points;

    if (!points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();

    for (const point of points) {
      this.#renderPoint(point);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripListComponent,
      offersList: this.offers,
      destinationsList: this.destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#tripContainer);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;
    }
  };

  #clearTrip = ({ resetSortType = false } = {}) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DATE;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
