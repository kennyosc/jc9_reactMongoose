import axios from 'axios'

export default axios.create(
    {
        baseURL: 'https://kennymongoosejc9.herokuapp.com/'
    }
)