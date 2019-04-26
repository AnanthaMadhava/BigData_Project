import { GET_DROPDOWN_LIST, DROPDOWN_LODING, GET_DROPDOWN_RESULT } from '../actions/types';  

const initialState = {
    loading: false,
    dropdown: null,
    dropdownResult: null
}

export default function(state = initialState, action) {
    switch (action.type){
        case DROPDOWN_LODING:
            return {
                ...state,
                loading: true,
            }
        case GET_DROPDOWN_LIST:
            return {
                ...state,
                dropdown: action.payload,
                loading: false
            }
        case GET_DROPDOWN_RESULT:
            return {
                ...state,
                dropdownResult: action.payload
            }
        default: 
            return state;
    }
}