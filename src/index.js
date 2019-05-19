import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './Reducers/reducers';
import App from './App';


import logger from "src/Utils/logger";


const store = createStore(reducer, applyMiddleware(thunk, logger));

connect.send('VKWebAppInit', {});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);
