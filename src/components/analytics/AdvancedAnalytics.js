import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GroupedBar from '../advanceAnalyticsChartGraph/GroupedBar';
import ItemProfile from '../advanceAnalyticsChartGraph/ItemProfile';
import ItemSales from '../advanceAnalyticsChartGraph/ItemSales';
import LineChart from '../advanceAnalyticsChartGraph/LineChart';

class AdvancedAnalytics extends Component {

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
                        <GroupedBar />
                    </div>
                    <div>
                        <ItemProfile />
                    </div>
                    <div>
                        <ItemSales />
                    </div>
                    <div>
                        <LineChart />
                    </div>
                </div>
            </div>
        );
    }
}

AdvancedAnalytics.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdvancedAnalytics);