import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './store/root-reducer';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {createAPI} from './services/api';
import {fetchProductCardsListAction} from './store/api-actions';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware ({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(fetchProductCardsListAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
