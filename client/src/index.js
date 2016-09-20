import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { updateWeather } from './actions/mirrorActions';
import configureStore from './store/configureStore';
import App from './containers/App';
import './index.css';

const socket = window.io();
const store = configureStore();

socket.on('refresh', () => {
  window.location.reload();
});

socket.on('weatherUpdate', data => {
  store.dispatch(updateWeather(data));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
