import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import Thunk from 'redux-thunk'
import Logger from 'redux-logger'
import Reducers from './reducers/index.js'
//ini setelah npm i --save bootstrap
//kita akan mengarahkan index untuk menjalankan bootstrap di link berikut
import 'bootstrap/dist/css/bootstrap.min.css'


import App from './components/App'

//ini untuk mengaktifkan redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//https://github.com/zalmoxisus/redux-devtools-extension
//Logger harus di taruh di depan baru Thunk
const STORE = createStore(Reducers, composeEnhancers(applyMiddleware(Logger,Thunk)))

ReactDOM.render(
    <Provider store={STORE}>
        <App/>
    </Provider>
    ,document.getElementById('root'))