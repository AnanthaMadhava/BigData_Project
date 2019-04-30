import { GET_CUSTOMER_DROPDOWN_LIST, CUSTOMER_DROPDOWN_LODING, GET_CUSTOMER_DROPDOWN_RESULT } from '../actions/types';  

const initialState = {
    loading: false,
    custDropList: null,
    custDropResult: null
}

export default function(state = initialState, action) {
    switch (action.type){
        case CUSTOMER_DROPDOWN_LODING:
            return {
                ...state,
                loading: true,
            }
        case GET_CUSTOMER_DROPDOWN_LIST:
            return {
                ...state,
                custDropList: action.payload,
                loading: false
            }
        case GET_CUSTOMER_DROPDOWN_RESULT:
            return {
                ...state,
                custDropResult: action.payload
            }
        default: 
            return state;
    }
}