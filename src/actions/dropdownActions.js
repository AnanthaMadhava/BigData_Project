import axios from 'axios';

import { API_URL, GET_DROPDOWN_LIST, DROPDOWN_LODING, GET_DROPDOWN_RESULT } from './types';

// Get Dropdown Values
export const dropdown = (username) => dispatch => {
    console.log(username)
    dispatch(getDropdownLoding());
    const headers = {
        'X-USER-ID': username,
        'X-USER-TOKEN': localStorage.jwtToken
    }
    // console.log(headers);
    axios.get(`${API_URL}/items/biztech`,{headers})
        .then(res => {
            // console.log(res.data);
            dispatch ({
                type: GET_DROPDOWN_LIST,
                payload: res.data.top10item
            });
        })
        .catch(err => {
            console.log(err);
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

export const dropdownValues = (value,username) => dispatch => {
    const headers = {
        'X-USER-ID': username,
        'X-USER-TOKEN': localStorage.jwtToken
    }
    axios.post(`${API_URL}/items/biztech`,{"item_id": value}, {headers})
        .then(res => {
            console.log(res.data["Probable_Customers "]);
            dispatch ({
                type: GET_DROPDOWN_RESULT,
                payload: res.data["Probable_Customers "]
            });
        })
        .catch(err => {
            dispatch ({
                type: GET_DROPDOWN_RESULT,
                payload: err.response.data
            });
        })
}