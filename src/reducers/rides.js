import * as types from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {},
  filters: {}
}

export default function rides(state = initialState, action) {
  switch (action.type) {
  case types.RIDES_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case types.RIDES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      items: action.items,
      pagination: action.pagination,
      filters: action.filters
    };
  default:
    return state;
  }
}
