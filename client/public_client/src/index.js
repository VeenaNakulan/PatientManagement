import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import './assets/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducer, applyMiddleware(thunk));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
