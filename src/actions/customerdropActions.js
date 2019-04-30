import axios from 'axios';

import { GET_CUSTOMER_DROPDOWN_LIST, CUSTOMER_DROPDOWN_LODING, GET_CUSTOMER_DROPDOWN_RESULT } from './types';

// Get Dropdown Values
export const customerDropdown = () => dispatch => {
    dispatch(getDropdownLoding());
    const headers = {
        'Authorization': localStorage.jwtToken
    }
    // console.log(headers);
    axios.get('/parties/Customer',{headers})
        .then(res => {
            //console.log(res.data);
            dispatch ({
                type: GET_CUSTOMER_DROPDOWN_LIST,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_CUSTOMER_DROPDOWN_LIST,
                payload: {}
            });
        })
}

// Loading Dropdown
export const getDropdownLoding = () => {
    return {
        type: CUSTOMER_DROPDOWN_LODING
    }
}

export const customerDropdownValues = (value) => dispatch => {
    const headers = {
        'Authorization': localStorage.jwtToken
    }
    axios.post('/parties/Customer',{"party_id": value}, {headers})
        .then(res => {
            dispatch ({
                type: GET_CUSTOMER_DROPDOWN_RESULT,
                payload: res.data.Possible_items
            });
        })
        .catch(err => {
            dispatch ({
                type: GET_CUSTOMER_DROPDOWN_RESULT,
                payload: err.response.data
            });
        })
}