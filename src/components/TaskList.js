import React from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'

class TaskList extends React.Component{


    //BUTTON : CHANGE COMPLETE/UNCOMPLETED TASK
    //ini bisa digunakan 2x
    //karena dalam backend nya task.completed = !task.completed
    changeTask = (task_id) =>{
        axios.patch(`/tasks/${this.props.id}/${task_id}`).then(res=>{
            console.log(res)
            this.props.rendering()
        })
    }

    //BUTTON DOUBLE CLICK : DELETE TASK
    deleteTask = (key) =>{

        if(window.confirm('Are you sure to delete this task?')){
            axios.delete(`/tasks/${key}`).then(res=>{
                alert('Task has been deleted')
            })
            this.props.rendering()
        } else{
            this.changeTask()
        }

    }

    render(){
            if(this.props.task.completed === true){
                return(
                    <li className="list-group-item list-group-item-warning"  onDoubleClick={()=>this.deleteTask(this.props.task._id)}>{this.props.task.description}
                    <button className='btn btn-light float-right' onClick={()=>this.changeTask(this.props.task._id)}>CANCEL</button></li>
                )
            } else if(this.props.task.completed === false){
                return(
                    <li className="list-group-item list-group-item-light" onDoubleClick={()=>this.deleteTask(this.props.task._id)}>{this.props.task.description}
                    <button className='btn btn-danger float-right' onClick={()=>this.changeTask(this.props.task._id)}>DONE</button></li>
                )
            }
    }
}

const mapStateToProps = (state) =>{
    return{
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(TaskList)