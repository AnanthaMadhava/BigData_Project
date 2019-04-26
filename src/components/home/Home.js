import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Home extends Component {

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            // <div class="card-deck">
            //     <div class="card">
            //         <img class="card-img-top" src="" alt="Card image cap" />
            //         <div class="card-body">
            //         <h5 class="card-title">Card title</h5>
            //         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            //         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            //         </div>
            //     </div>
            //     <div class="card">
            //         <img class="card-img-top" src="" alt="Card image cap" />
            //         <div class="card-body">
            //         <h5 class="card-title">Card title</h5>
            //         <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            //         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            //         </div>
            //     </div>
            // </div>

            // <div className="tiles">
            //     <div className="home_tiles">
            //         <Link to="/Visual_Analysis" className="tiles_link" >
            //             Visual Analysis
            //         </Link>
            //         <Link to="/Advanced_Analysis" className="tiles_link">
            //             Advanced Analysis
            //         </Link>
            //     </div>
            // </div>
            <div>
                Home
            </div>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Home));