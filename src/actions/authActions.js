import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { API_URL, GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>  
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
    function login() {
    axios.post(`${API_URL}/auth/`, userData)
        .then(res => {
            // Save to localstorage
            const token = res.data.tkn.token;
            // console.log(token);
            // console.log(res.data);
            console.log('Token');
            // Set token to LocalStorage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            //  Decode token to get user data
            // const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(token));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })    
        );
    }
    // Call it once to begin with
    login();
    // Then create an interval to run the function every 30 seconds:
    setInterval(login, 90000);
};

// Set logged in user
export const setCurrentUser = token => dispatch => {
    // return {
    //     type: SET_CURRENT_USER,
    //     payload: decoded
    // }
    if(token === localStorage.jwtToken){
        // console.log(token);
        const headers = {
            'X-USER-TOKEN': token
        }
        axios.get(`${API_URL}/user_domain/`,{headers})
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: res.data
                })
            )
            .catch(err => { 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            });
    } else {
        // console.log('Logout');
        dispatch ({
            type: SET_CURRENT_USER,
            payload: {}
        })
    }
}

// Log user out
export const logoutUser = (history) => dispatch => {
    // Remove token from localstorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));

    if(history) {
        history.push('/');
    } else {
        // Redirect to login
        window.location.href = '/login';
    }
}