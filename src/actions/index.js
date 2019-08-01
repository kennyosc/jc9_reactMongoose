import axios from '../config/axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLogin = (da_email, da_password) => {

    return (dispatch) => {
        axios.post(
            '/users/login',
            {
                email: da_email,
                password: da_password
            }
        ).then(res => {
            // Jika data salah, res.data berisi string
            if(typeof(res.data) == 'string'){
                // Print errornya
                console.log('Error: ' + res.data)
            } else {

                // Simpan id dan name di cookie
                cookie.set(
                    'dataUser',
                    {
                        id: res.data._id,
                        name: res.data.name
                    }
                )
                // Kirim id dan name ke redux
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        id: res.data._id,
                        name: res.data.name
                    }
                })
            }
        })
    }

}

export const keepLogin = (objCookie) =>{
    return{
        type:'LOGIN_SUCCESS',
        payload:{
            id: objCookie.id,
            name: objCookie.name
        }
    }
}

export const logout = () =>{
    cookie.remove('dataUser')

    return{
        type:'LOGOUT_SUCCESS'
    }
}