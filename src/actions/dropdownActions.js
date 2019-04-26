import axios from 'axios';

import { GET_DROPDOWN_LIST, DROPDOWN_LODING, GET_DROPDOWN_RESULT } from './types';

// Get Dropdown Values
export const dropdown = () => dispatch => {
    dispatch(getDropdownLoding());
    const headers = {
        'Authorization': localStorage.jwtToken
    }
    // console.log(headers);
    axios.get('/items/biztech',{headers})
        .then(res => {
            //console.log(res.data);
            dispatch ({
                type: GET_DROPDOWN_LIST,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_DROPDOWN_LIST,
                payload: {}
            });
        })
}

// Loading Dropdown
export const getDropdownLoding = () => {
    return {
        type: DROPDOWN_LODING
    }
}

export const dropdownValues = (value) => dispatch => {
    const headers = {
        'Authorization': localStorage.jwtToken
    }
    axios.post('/items/biztech',{"item_id": value}, {headers})
        .then(res => {
            dispatch ({
                type: GET_DROPDOWN_RESULT,
                payload: res.data.Possible_Customers
            });
        })
        .catch(err => {
            dispatch ({
                type: GET_DROPDOWN_RESULT,
                payload: err.response.data
            });
        })
}