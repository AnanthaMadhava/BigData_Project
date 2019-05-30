import axios from 'axios';

import { API_URL, GET_CUSTOMER_DROPDOWN_LIST, CUSTOMER_DROPDOWN_LODING, GET_CUSTOMER_DROPDOWN_RESULT } from './types';

// Get Dropdown Values
export const customerDropdown = (username) => dispatch => {
    dispatch(getDropdownLoding());
    const headers = {
        'X-USER-ID': username,
        'X-USER-TOKEN': localStorage.jwtToken
    }
    // console.log(headers);
    axios.get(`${API_URL}/parties/Customer`,{headers})
        .then(res => {
            // console.log(res.data);
            dispatch ({
                type: GET_CUSTOMER_DROPDOWN_LIST,
                payload: res.data.top10paries
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

export const customerDropdownValues = (value, username) => dispatch => {
    const headers = {
        'X-USER-ID': username,
        'X-USER-TOKEN': localStorage.jwtToken
    }
    axios.post(`${API_URL}/parties/Customer`,{"party_id": value}, {headers})
        .then(res => {
            // console.log(res.data);
            dispatch ({
                type: GET_CUSTOMER_DROPDOWN_RESULT,
                payload: res.data["Possible_items "]
            });
        })
        .catch(err => {
            dispatch ({
                type: GET_CUSTOMER_DROPDOWN_RESULT,
                payload: err.response.data
            });
        })
}