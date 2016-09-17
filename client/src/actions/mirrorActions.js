import * as types from '../constants/actionTypes';

export function updateWeather(data) {
  return {
    type: types.UPDATE_WEATHER,
    payload: data
  }
}

export function updateUrbanWord(data) {
  return {
    type: types.UPDATE_URBAN_WORD,
    payload: data
  }
}
