import Observable from '../framework/observable.js';
import { getPoints } from '../mock/point.js';

const POINT_COUNT = 4;

export default class PointsModel extends Observable {
  #points = getPoints(POINT_COUNT);

  get points() {
    return this.#points;
  }
}
