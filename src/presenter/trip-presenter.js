import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  tripListComponent = new TripListView();

  constructor({ tripContainer, pointsModel }) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(
      new EditPointView({ point: this.tripPoints[0] }),
      this.tripListComponent.getElement(),
    );

    for (let i = 1; i < this.tripPoints.length; i++) {
      render(
        new PointView({ point: this.tripPoints[i] }),
        this.tripListComponent.getElement(),
      );
    }
  }
}
