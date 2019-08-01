import React,{Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import Login from './Login'
import Register from './Register'
import Home from './Home'
import Header from './Header'
import Profile from './Profile'
import {keepLogin} from '../actions/index.js'
import EditProfile from './EditProfile.js'

const cookie = new cookies()

class App extends Component{

    componentWillMount(){
        const objCookie = cookie.get('dataUser')

        console.log(objCookie)
        if(objCookie !== undefined){
            this.props.keepLogin(objCookie)
        }
    }

    render(){
        return(
            <BrowserRouter>
                <Header/>
                <div>
                    <Route path='/' exact component={Home}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/editprofile' component={EditProfile}/>
                </div>
            </BrowserRouter>
        )
    }
}

//connect untuk menghubungkan antara action dengan component
export default connect(null,{keepLogin})(App)