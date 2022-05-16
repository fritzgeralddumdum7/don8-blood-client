import axios from 'axios';
import Cookies from 'js-cookie';

const user = Cookies.get('don8_blood');

const API = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        Authorization: user && JSON.parse(user).access_token
    }
})

export default API;
