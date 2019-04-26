import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dropdown, dropdownValues } from '../../actions/dropdownActions';

class Item extends Component {

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
            // <div style={{marginBottom: '665px'}}>
            //     <select style={{height: '50px', width: '200px', padding: '5px', borderRadius: '4px'}} onChange={e => this.handlechange(e)}>
            //         <option disabled selected>Select Your Product</option>
            //         {/* <option value={1}>1</option>
            //         <option value={2}>2</option> */}
            //         {
            //             dropdown &&
            //                 dropDownList
            //         } 
            //     </select>
            //     {
            //         this.state.open ?
            //         (
            //             <div className="resultDrop">
            //                 <div className="text-center">
            //                     <h3>Customers on next seven days buying product</h3>
            //                 </div>
            //                 <div className="dropdownResult">
            //                     <ol>
            //                     {
            //                         dropdownResult &&
            //                         dropdownResult.map((result,i) => (
            //                             <li key={i} value={result.name}>{result.name}</li>
            //                         ))
            //                     }
            //                     </ol>
            //                 </div>
            //             </div>
            //         )
            //         :
            //         null
            //     }
                
            // </div>
            <div className="analysis">
                <div className="text-center">
                    <h2></h2>
                </div>
                <div className="advanced_analysis">
                    <div>
                        <div className="product_Drop">
                            <h5>Choose Item</h5>
                        </div>
                        <select style={{height: '50px', width: '200px', padding: '5px', borderRadius: '4px'}} onChange={e => this.handlechange(e)}>
                            <option disabled selected>Select Your Item</option>
                            {/* <option value={1}>1</option>
                            <option value={2}>2</option> */}
                            {
                                dropdown &&
                                    dropDownList
                            } 
                        </select>
                    </div>
                    <div>
                        {
                            this.state.open ?
                            (
                                <div className="resultDrop">
                                    <div className="text-center">
                                        <h3>Items on next seven days buying Predict</h3>
                                    </div>
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
                    <div>
                        {/* {
                            this.state.open ?
                            (
                                <div>
                                    <div className="text-center">
                                        <h3>Time Predict</h3>
                                    </div>
                                </div>
                            )
                            :
                            null
                        } */}
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    dropdown: PropTypes.func.isRequired,
    dropdownValues: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    drop: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    drop: state.drop,
    auth: state.auth
});

export default connect(mapStateToProps, { dropdown, dropdownValues })(Item);