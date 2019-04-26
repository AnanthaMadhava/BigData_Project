import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../chartGraph/BarChart.css';
import BarChart1 from '../chartGraph/Barchart1';
import BarChart2 from '../chartGraph/BarChart2';
import LineChart from  '../chartGraph/LineChart';
import PieChart from '../chartGraph/PieChart';

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
                    <h2>Graph</h2>
                </div>
                <div className="dashboard-Graph">
                    <div>
                        <BarChart1 />
                    </div>
                    <div>
                        <PieChart />
                    </div>
                    <div>
                        <LineChart />
                    </div>
                    <div>
                        <BarChart2 />
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