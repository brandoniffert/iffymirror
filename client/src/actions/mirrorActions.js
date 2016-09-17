import * as types from '../constants/actionTypes';

export function updateWeather(data) {
  return {
    type: types.UPDATE_WEATHER,
    payload: data
  }
}
