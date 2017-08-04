import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import reducer from './reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import './assets/styles/reset.css';
import './assets/styles/main.scss';

import UploadWidget from './components/widget/Upload';
import ListWidget from './components/widget/List';

const store = createStore(reducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <div className="main">
      <UploadWidget />
      <ListWidget />
    </div>
  </Provider>,
  document.getElementById('root')
);
