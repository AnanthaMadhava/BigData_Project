import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BarChart1 from '../analyticsChartGraph/Barchart1';
import BarChart2 from '../analyticsChartGraph/BarChart2';
import LineChart from  '../analyticsChartGraph/LineChart';
import PieChart from '../analyticsChartGraph/PieChart';

class Analytics extends Component {

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <h2>Sales Insights</h2>
                </div>
                <div className="dashboard-Graph">
                    <div>
                        <BarChart2 />
                    </div>
                    <div>
                        <PieChart />
                    </div>
                    <div>
                        <LineChart />
                    </div>
                    <div>
                        <BarChart1 />
                    </div>
                </div>
            </div>
        );
    }
}

Analytics.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Analytics);