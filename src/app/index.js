import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/home/Home';
import landing from './components/landing/landing';
import thunk from 'redux-thunk';

import reducers from './reducers';

import './components/bundle.scss';
//createStore(rootReducer, applyMiddleware(thunk));
//const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render( <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={landing} />;
        <Route path="/Home" component={Home} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));
