import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import Reducers from './reducers/index.js'
//ini setelah npm i --save bootstrap
//kita akan mengarahkan index untuk menjalankan bootstrap di link berikut
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './components/App'

const STORE = createStore(Reducers, applyMiddleware(Thunk))

ReactDOM.render(
    <Provider store={STORE}>
        <App/>
    </Provider>
    ,document.getElementById('root'))