import React,{Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Home from './Home'

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={Home}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' component={Login}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App