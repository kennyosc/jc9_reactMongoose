import React,{Component} from 'react'
import axios from '../config/axios'
import { Jumbotron} from 'reactstrap'
import {connect} from 'react-redux'

class Profile extends Component{
    state = {
        data: undefined,
        image: null
    }

    componentDidMount() {
        // Get Profile
        axios.get('/users/' + this.props.id)
            .then(res => {
                this.setState({data: res.data});
            })

            //ketika mengambil avatar dari database, bentuknya tetap binary.
            //tetapi ketika dimunculkan src, itu akan di render sebagai sebuah image
    //     axios.get('http://localhost:2019/users/5d2ff7fe6b527522b4d21cfc/avatar').then(res=>{
    //         this.setState({image:res.data})
    //     })
    }

    
    render() {
        if(this.props.id){
            return (
                <div className="container mt-5">
                    <Jumbotron >
                        <img src={'http://localhost:2019/users/'+ this.props.id +'/avatar'} alt="Please choose your avatar" key={new Date()} />
                        <h1 className="display-3">Hello, {this.props.name} </h1>
                        <p className="lead"></p>
                    </Jumbotron>
                </div>
            )
        }

        return <h1>Loading</h1>
    }
}

const mps = state => {
    return {
        id: state.auth.id,
        name:state.auth.name
    }
}

export default connect(mps)(Profile)