import axios from 'axios';

import { GRAPH_LOADING, BAR_GRAPH1, BAR_GRAPH2, LINE_GRAPH, PIE_GRAPH } from  './types';

// Get BAR_Graph1 values
export const bargraph1 = () => dispatch => {
    dispatch(getGraphLoading());
    const headers = {
        'Authorization': localStorage.jwtToken
    }
    // console.log(headers);
    axios.post('/partywise_aggregated_sales/barchart1',{},{headers})
        .then(res => {
            // console.log(res.data);
            dispatch ({
                type: BAR_GRAPH1,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: BAR_GRAPH1,
                payload: err.response.data
            });
        })
}

export const bargraph2 = () => dispatch => {
    dispatch(getGraphLoading());
    const headers = {
        'Authorization': localStorage.jwtToken
    }
    // console.log(headers);
    axios.post('/itemwise_aggregated_salse_in_amt/barchart2',{},{headers})
        .then(res => {
            // console.log(res.data);
            dispatch ({
                type: BAR_GRAPH2,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: BAR_GRAPH2,
                payload: err.response.data
            });
        })
}

export const linechart = () => dispatch => {
    dispatch(getGraphLoading());
    const headers = {
        'Authorization': localStorage.jwtToken
    }
    // console.log(headers);
    axios.post('/montly_sales/linechart',{},{headers})
        .then(res => {
            // console.log(res.data);
            dispatch ({
                type: LINE_GRAPH,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: LINE_GRAPH,
                payload: err.response.data
            });
        })
}

export const piechart = () => dispatch => {
    dispatch(getGraphLoading());
    const headers = {
        'Authorization': localStorage.jwtToken
    }
    // console.log(headers);
    axios.post('/quaterly_sales/piechart',{},{headers})
        .then(res => {
            // console.log(res.data);
            dispatch ({
                type: PIE_GRAPH,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: PIE_GRAPH,
                payload: err.response.data
            });
        })
}

// Loading Graph
export const getGraphLoading = () => {
    return {
        type: GRAPH_LOADING
    }
}
