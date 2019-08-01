import React,{Component} from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import TaskList from './TaskList'

class Home extends Component{

    state={
        allTask:[]
    }

    componentDidMount(){
        axios.get('/tasks/' + this.props.id).then(res=>{
            this.setState({allTask : res.data})
        })
    }

    getTask = () =>{
        axios.get('/tasks/'+ this.props.id).then(res=>{
            this.setState({allTask : res.data})
        })
    }


    //BUTTON : ADD TASK
    handleAddTask = () =>{
        const description = this.description.value

        // Post task baru
        axios.post(
            '/task/' + this.props.id,
            {
                description
            }
        ).then(() => {
            // Get tasks
            axios.get(
                '/tasks/' + this.props.id
            ).then(res => {
                this.setState({tasks: res.data})
                this.getTask()
            })
        })
    }

    //RENDER ALL LIST
    renderList = () =>{
        console.log(this.state.allTask)
        return this.state.allTask.map((val)=>{
            return (
                <TaskList task={val} rendering={this.getTask}/>
            )
        })
    }

    datainput = (event) =>{
        event.preventDefault()

        this.handleAddTask()
    }

    render(){
        if(this.props.id){
            return(
                <div className='container'>
                    <h1 className='display-4 text-center'>Todo List</h1>
                    <div>
                        <ul className="list-group list-group-flush">
                            {this.renderList()}
                        </ul>
                    </div>
                    <h1 className='display-4 text-center'>Add Task</h1>
                    <form className='form-group' onSubmit={this.datainput}>
                        <input className='form-control' placeholder='Insert New Task' ref={(input)=> this.description = input}/>
                    </form>
                    <button className='btn btn-primary btn-block' onClick={this.handleAddTask}>Add Task</button>
                </div>
            )
        }

        return <Redirect to='/login'/>
    }
}

const mapStateToProps = (state) =>{
    return{
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(Home)