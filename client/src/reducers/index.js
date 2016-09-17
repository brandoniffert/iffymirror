import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/actionTypes';

const initialState = {
  weather: {
    todayTemp: '-',
    todaySummary: '-',
    todayIcon: 'CLEAR_DAY',
    todayHigh: '-',
    todayLow: '-',
    nextDays: []
  }
};

const mirrorAppState = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_WEATHER:
      return Object.assign({}, state, {
        weather: action.payload
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  mirrorAppState
});

export default rootReducer;
