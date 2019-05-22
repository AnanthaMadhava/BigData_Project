import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Distribution from '../../img/graph/Distributors-Agency.jpg';
import Retail from '../../img/graph/retail.jpg';
import WebDataMaintaining from '../../img/graph/webDataMaintaining.jpg'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    {/* <div className="landing">
                        <div className="dark-overlay landing-inner text-light">
                            <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Big Data
                                </h1>
                                <p className="lead"></p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="container">
                        {/* <div className = "row">
                            <div className = "col-md-4 col-md-4">
                                <div className = "thumbnail">
                                    <img src = "../../" alt = "Generic placeholder thumbnail" />
                                </div>
                                
                                <div className = "caption">
                                    <h3>Thumbnail label</h3>
                                    <p>Some sample text. Some sample text.</p>
                                    
                                    <p>
                                        <a href = "#" className = "btn btn-primary" role = "button">
                                        Button
                                        </a> 
                                        
                                        <a href = "#" className = "btn btn-default" role =" button">
                                        Button
                                        </a>
                                    </p>
                                    
                                </div>
                            </div>
                            <div className = "col-md-4 col-md-4">
                                <div className = "thumbnail">
                                    <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" />
                                </div>
                                
                                <div className = "caption">
                                    <h3>Thumbnail label</h3>
                                    <p>Some sample text. Some sample text.</p>
                                    
                                    <p>
                                        <a href = "#" className = "btn btn-primary" role = "button">
                                        Button
                                        </a> 
                                        
                                        <a href = "#" className = "btn btn-default" role =" button">
                                        Button
                                        </a>
                                    </p>
                                    
                                </div>
                            </div>
                            <div className = "col-md-4 col-md-4">
                                <div className = "thumbnail">
                                    <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" />
                                </div>
                                
                                <div className = "caption">
                                    <h3>Thumbnail label</h3>
                                    <p>Some sample text. Some sample text.</p>
                                    
                                    <p>
                                        <a href = "#" className = "btn btn-primary" role = "button">
                                        Button
                                        </a> 
                                        
                                        <a href = "#" className = "btn btn-default" role =" button">
                                        Button
                                        </a>
                                    </p>
                                    
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="landing-tiles">
                            <div>
                                1
                            </div>
                            <div>
                                2
                            </div>
                            <div>
                                3
                            </div>
                        </div> */}
                        <div className="landing-logo">
                            <div className="logo-box">
                                A A P
                            </div>
                        </div>
                        <div className="landing-tiles">
                            <Link to="/login" className="title-link">
                                <img src={Distribution} alt="Sample photo" style={{height: '200px'}} />
                                <div className="text">
                                    <h3>Distributions / Agency</h3>
                                    {/* <p>Collaboratively administrate empowered markets via plug-and-play networks.</p> */}
                                </div>
                            </Link>
                            <Link to="/login" className="title-link">
                                <img src={Retail} alt="Sample photo" style={{height: '200px'}} />
                                <div className="text">
                                    <h3>Retail</h3>
                                    {/* <p>Collaboratively administrate empowered markets via plug-and-play networks.</p> */}
                                </div>
                            </Link>
                            <Link to="/login" className="title-link">
                                <img src={WebDataMaintaining} alt="Sample photo" style={{height: '200px'}} />
                                <div className="text">
                                    <h3>Web Data Analysis</h3>
                                    {/* <p>Collaboratively administrate empowered markets via plug-and-play networks.</p> */}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);