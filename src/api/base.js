import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
    }
})

export default API
