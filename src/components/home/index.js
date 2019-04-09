import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dropdown, dropdownValues } from '../../actions/dropdownActions';

class Home extends Component {

    state={
        open: false,
        fullWidth: true,
        maxWidth: 'sm'
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
        }

        this.props.dropdown();
    }

    handlechange = (e) => {
        const item_id = e.target.value;
        this.setState({
            open: true
        })
        this.props.dropdownValues(item_id);
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {dropdown} = this.props.drop;
        // console.log(dropdown);
        
        let dropDownList = null;
        if(dropdown){
            dropDownList = Object.keys(dropdown).map(function(key) {
                return <option key={key} value={key}>{dropdown[key]}</option>
            });
        }

        const {dropdownResult} = this.props.drop;
        
        return (
            <div style={{marginBottom: '665px'}}>
                <select style={{height: '50px', width: '200px', padding: '5px', borderRadius: '4px'}} onChange={e => this.handlechange(e)}>
                    <option disabled selected>Select your choice</option>
                    {/* <option value={1}>1</option>
                    <option value={2}>2</option> */}
                    {
                        dropdown &&
                            dropDownList
                    } 
                </select>
                {
                    this.state.open ?
                    (
                        <div className="resultDrop">
                            <div className="dropdownResult">
                                <ol>
                                {
                                    dropdownResult &&
                                    dropdownResult.map((result,i) => (
                                        <li key={i} value={result.name}>{result.name}</li>
                                    ))
                                }
                                </ol>
                            </div>
                        </div>
                    )
                    :
                    null
                }
                
            </div>
        );
    }
}

Home.propTypes = {
    dropdown: PropTypes.func.isRequired,
    dropdownValues: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    drop: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    drop: state.drop,
    auth: state.auth
});

export default connect(mapStateToProps, { dropdown, dropdownValues })(Home);