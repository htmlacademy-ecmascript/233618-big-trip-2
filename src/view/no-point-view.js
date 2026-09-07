import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const noPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
};

const createNoPointTemplate = (filterType) => {
  const noPointsTextValue = noPointsTextType[filterType];

  return `<p class="trip-events__msg">${noPointsTextValue}</p>`;
};

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
