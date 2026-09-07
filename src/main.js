import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import isBetween from 'dayjs/plugin/isBetween.js';
dayjs.extend(duration);
dayjs.extend(isBetween);

import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';

const filterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  filterModel,
  pointsModel,
});

filterPresenter.init();
tripPresenter.init();
