const EVENT_TYPES = [
  'bus',
  'check-in',
  'drive',
  'flight',
  'restaurant',
  'ship',
  'sightseeing',
  'taxi',
  'train',
];

const DEFAULT_TYPE = 'flight';

const SortType = {
  DATE: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const FiterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  EVENT_TYPES,
  DEFAULT_TYPE,
  FiterType,
  SortType,
  UserAction,
  UpdateType,
};
