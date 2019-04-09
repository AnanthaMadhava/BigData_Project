import { GRAPH_LOADING, BAR_GRAPH1, BAR_GRAPH2, LINE_GRAPH, PIE_GRAPH } from '../actions/types';

const initialState = {
    loading: false,
    bargraph1: null,
    bargraph2: null,
    linegraph: null,
    piegraph: null
}

export default function(state = initialState, action){
    switch (action.type){
        case GRAPH_LOADING:
            return {
                ...state,
                loading: true,
            }
        case BAR_GRAPH1:
            return {
                ...state,
                bargraph1 : action.payload,
                loading: false
            }
        case BAR_GRAPH2:
            return {
                ...state,
                bargraph2 : action.payload,
                loading: false
            }
        case LINE_GRAPH:
            return {
                ...state,
                linegraph : action.payload,
                loading: false
            }
        case PIE_GRAPH:
            return {
                ...state,
                piegraph: action.payload,
                loading: false
            }
        default: 
            return state;
    }
}