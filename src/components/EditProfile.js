import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from '../config/axios'

class EditProfile extends Component{

    state={
        data: null
    }

    componentDidMount() {
        // Get Profile
        axios.get('/users/' + this.props.id)
            .then(res => {
                this.setState({data: res.data});
            })
    }

    handleUpload = (user_id) => {

        //formData provides a way to easily construct a set of key/value pairs representing form fields and their values
        //A key-value pair is a set of two linked data items. KEY : VALUE
        //kita pakai formData karena kita mau kirim gambar dan bukan hanya dalam bentuk JSON OBJECT
        const formData = new FormData()
        const avatar_data = this.avatar.files[0]

        const name_data = this.name.value
        const email_data = this.email.value
        const age_data = this.age.value
        const pass_data = this.password.value

        // .append untuk memasukkan key-value pair ke dalam formData
        formData.append('ravatar', avatar_data)
        formData.append('name', name_data)
        formData.append('email', email_data)
        formData.append('age', age_data)
        formData.append('password', pass_data)

        axios.patch(`/users/${user_id}`, formData).then(res=>{
            console.log('Data berhasil diupdate')
        })

    }

    render(){
        if(this.state.data){
            const {name,email,age} = this.state.data
            return(
                <div className='container'>
                    <form>
                            <h1>Edit Profile</h1>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input ref={input => this.name = input} type="text" className="form-control" id="name" defaultValue={name}/>
                            </div>
    
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input ref={input => this.email = input} type="email" className="form-control" id="email" defaultValue={email}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
    
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input ref={input => this.age = input} type="number" className="form-control" id="age" defaultValue={age}/>
                            </div>
    
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input ref={input => this.password = input} type="password" className="form-control" id="password"/>
                            </div>
    
                            <div className="input-group my-3">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02" ref={(input)=>this.avatar=input}/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
                                </div>
                            </div>
                    </form>
                    <button className='btn btn-primary' onClick={()=>{this.handleUpload(this.props.id)}}>Update</button>
                </div>
            )
        }
        

        return(
            <div className='container'>
                <h1 className='display-5'>LOADING...</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(EditProfile)