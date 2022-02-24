import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './store/root-reducer';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import {createAPI} from './services/api';
import browserHistory from './browser-history';
import {HistoryRouter} from 'react-router-dom';
import { redirect } from './store/middlewares/redirect';
//import { HelmetProvider } from 'react-helmet-async';


const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware ({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>

        <App />

        <ToastContainer />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
