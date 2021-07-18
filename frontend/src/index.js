import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';

const store = configureStore();


if (process.env.NODE_ENV !== 'production') { //in dev
  restoreCSRF(); //fetch the csrf token from backend
  window.csrfFetch = csrfFetch;
  window.store = store;
}

//wrap our app with the store and router providers
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
