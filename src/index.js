import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import { Provider } from 'react-redux'
import rootReducer from './reducer'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
