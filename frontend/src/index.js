import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import { ModalProvider } from "./context/Modal";

// thunk and redux
import * as sessionActions from './store/session';
import NavbarProvider from './context/NavbarContext';

const store = configureStore();

//when app is first loaded in, restore the CSRF token
if (process.env.NODE_ENV !== 'production') { //in dev
  restoreCSRF(); //fetch the csrf token from backend
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions; //attach session actions to window
}

//wrap our app with the store and router providers
function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <NavbarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NavbarProvider>
      </ModalProvider>


    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
