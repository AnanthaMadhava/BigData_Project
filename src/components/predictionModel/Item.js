import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dropdown, dropdownValues } from '../../actions/dropdownActions';
import axios from 'axios';
import * as d3 from 'd3';
import './ItemChart1.css';
import './ItemChart2.css';

class Item extends Component {

    state={
        open: false,
        fullWidth: true,
        maxWidth: 'sm',
        salesName: ''
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
        }

        this.props.dropdown();
    }

    handlechange = (e) => {
        // console.log(e.target[e.target.value].text)
        d3.select("svg").remove();
        d3.select("svg").remove();
        const item_id = e.target.value;
        this.setState({
            open: true,
            salesName : e.target[e.target.value].text
        })
        this.props.dropdownValues(item_id);

        const headers = {
            'Authorization': localStorage.jwtToken
        }
        // console.log(headers);
        axios.post('/get_item_monthly_sales/item',{"item_id": item_id},{headers})
            .then(res => {
                console.log(res.data.item_montly_sales);
                // console.log(this.state.result)
                // this.setState({
                //     result: [...res.data.customerise_aggregated_sales]
                // })
                // // console.log(this.state.result)
                this.itemChart1(res.data.item_montly_sales);
            })
            .catch(err => {
                console.log(err)
            })

        axios.post('/item_qty_sold_to_party/item',{"item_id": item_id},{headers})
            .then(res => {
                console.log(res.data.item_purchaed_by_customers);
                // console.log(this.state.result)
                // this.setState({
                //     result: [...res.data.customerise_aggregated_sales]
                // })
                // // console.log(this.state.result)
                this.itemChart2(res.data.item_purchaed_by_customers);
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    itemChart1 = (data) => {
        const width = 760,
            height = 500,
            chartRadius = height / 2 - 50;
            const color = d3.scaleOrdinal(d3.schemeCategory10);
            let svg = d3.select('#itemChart1').append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
                .attr('transform', 'translate(' + width / 2 + ',' + (height / 2+10) + ')');
            let tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip');
            
            svg.append("text")
                .attr("x",0)
                .attr("y", -230)
                .style("text-anchor", "middle")
                .style("font-size", "25px")
                .style("font-family","Helvetica")
                .style("font-style","Bold")
                .text(this.state.salesName + " Quantity VS Predicted Items")
            const PI = Math.PI,
            arcMinRadius = 10,
            arcPadding = 10,
            labelPadding = -5,
            numTicks = 10;
            const render = data => {
                data.forEach(function(d){
                    d.name = d.key
                    d.value = d.value
                })
                function sortAsending(a, b)
                {
                    return b.value - a.value;
                }
                data=data.sort(sortAsending);
                let scale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.value) * 1.1])
                    .range([0, 2 * PI]);
                let ticks = scale.ticks(numTicks).slice(0, -1);
                let keys = data.map((d, i) => d.name);
                //number of arcs
                const numArcs = keys.length;
                const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;
                let arc = d3.arc()
                    .innerRadius((d, i) => getInnerRadius(i))
                    .outerRadius((d, i) => getOuterRadius(i))
                    .startAngle(0)
                    .endAngle((d, i) => scale(d))
                let radialAxis = svg.append('g')
                    .attr('class', 'r axis')
                    .selectAll('g')
                    .data(data)
                    .enter().append('g');
                radialAxis.append('circle')
                    .attr('r', (d, i) => getOuterRadius(i) + arcPadding);
                radialAxis.append('text')
                    .attr('x', labelPadding)
                    .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
                    .style("font-size", "10px")
                    .attr("fill", "black")
                    .style("font-family", "Arial")
                    .text(d => d.name);
                let axialAxis = svg.append('g')
                    .attr('class', 'a axis')
                    .selectAll('g')
                    .data(ticks)
                    .enter().append('g')
                        .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');
                axialAxis.append('line')
                    .attr('x2', chartRadius);
                axialAxis.append('text')
                    .attr('x', chartRadius + 10)
                    .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
                    .style("font-size", "10px")
                    .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
                    .text(d => d3.format(".3s")(d));
                //data arcs
                let arcs = svg.append('g')
                    .attr('class', 'data')
                    .selectAll('path')
                    .data(data)
                    .enter().append('path')
                    .attr('class', 'arc')
                    .style('fill', (d, i) => color(i))
                arcs.transition()
                    .delay((d, i) => i * 200)
                    .duration(1000)
                    .attrTween('d', arcTween);
                arcs.on('mousemove', showTooltip)
                arcs.on('mouseout', hideTooltip)
                function arcTween(d, i) {
                    let interpolate = d3.interpolate(0, d.value);
                    return t => arc(interpolate(t), i);
                }
                function showTooltip(d) {
                    tooltip.style('left', (d3.event.pageX + 10) + 'px')
                    .style('top', (d3.event.pageY - 25) + 'px')
                    .style('display', 'inline-block')
                    .html(d3.format(".3s")(d.value));
                }
                function hideTooltip() {
                    tooltip.style('display', 'none');
                }
                function rad2deg(angle) {
                    return angle * 180 / PI;
                }
                function getInnerRadius(index) {
                    return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
                }
                function getOuterRadius(index) {
                    return getInnerRadius(index) + arcWidth;
                }
            }
            render(data);
    }

    itemChart2 = (data) => {
        let width = 760, height = 500;
        const svg = d3.select("#itemChart2").append('svg')
                        .attr("width", width)
                        .attr("height", height);
        var dparse = d3.timeParse("%B-%Y")
        var dformat = d3.timeFormat("%B-%Y")

        // const width = svg.attr('width');
        // const height = svg.attr('height');
        var color = d3.scaleOrdinal().range(d3.schemeCategory10)


        const render = data => {

            const xvalue =  d => d.qty;
            const yvalue = d => d.name;

            var margin = {top: 30, right: 20, bottom: 50, left:160};
            var innerwidth = width - margin.left - margin.right;
            var innerheight = height - margin.top - margin.bottom;

            const g = svg.append('g')
                        .attr('transform', "translate(" + margin.left + "," + margin.top + ")");


            console.log(data)

            function sortAscending(a, b){
                return a.qty - b.qty;
            }

            data = data.sort(sortAscending);


            const xscale = d3.scaleLinear()
                        .domain([0, d3.max(data, xvalue)])
                        .range([0, innerwidth]);

            const xaxistickformat = number =>
                            d3.format('.3s')(number);

            const xaxisG = g.append('g').call(d3.axisBottom(xscale)
                        .tickFormat(xaxistickformat).tickSize(-innerheight+10))
                        .attr('transform', "translate(0 ," + innerheight + ")");

                xaxisG.select('.domain')
                    .remove();

                xaxisG.append('text')
                .attr("class", "axis-label")
                .attr('y', 40)
                .attr('x', innerwidth / 2)
                .attr("fill", "black")
                .text('Quantity')

            // function sortByDateAscending(a, b){
            //     return b.name - a.name;
            // }

            // data = data.sort(sortByDateAscending);

            const yscale = d3.scaleBand()
                        .domain(data.map(yvalue))
                        .range([0, innerheight])
                        .padding(0.1);

            const yaxis = d3.axisLeft(yscale);
                            
            //yaxis(g.append('g'));
            const yaxisG = g.append('g').call(yaxis)

            yaxisG.selectAll('.domain, .tick line')
                            .remove()

            // yaxisG.append('text')
            //     .attr("class", "Yaxis-label")
            //     .attr('y', -90)
            //     .attr('x', -170)
            //     .attr("fill", "black")
            //     .attr("transform", "rotate(-90)")
            //     .text('Name Of Items');


            g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', d => yscale(yvalue(d)))
            .attr('width', 0)
            .transition()
            .duration(2500)
            .delay(function (d, i) {
                    return i * 50;
            })
            .attr('width', d => xscale(xvalue(d)))
            .attr('height', yscale.bandwidth())
            .attr("fill", function(d){ return color(d.qty)});

        g.append('text')
                .attr("class", "title")
                .attr('y', -5)
                .attr('x', innerwidth/2)
                .style("text-anchor", "middle")
                .style("font-size", "25px")
                .style("font-family","Helvetica")
                .style("font-style","Bold")
                .text(this.state.salesName + " Sales")

            // g.selectAll('rect')
            //     .data(data)
            //     .enter()                    
            //     .append('text')
            //     .attr("class", "bar_text")
            //     .attr('y', d => yscale(yvalue(d)))
            //     .attr('x', d => xscale(xvalue(d)))
            //     .attr('fill', "black")
            //     .text(function(d){ 
            //             return d.value;
            //     })

            console.log(innerwidth)

            

        };    
        render(data)
    }

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
        // console.log(dropdownResult);
        
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
                        <div className="adv_analytics">
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
                    </div>
                    <div>
                        {
                            this.state.open ?
                            (
                                <div className="resultDrop">
                                    <div className="text-center">
                                        <h3>Possible Items Can be Purchased</h3>
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
                        {
                            this.state.open ?
                            (
                                <div>
                                    <div id="itemChart1">
                                        {/* <h3>Time Predict</h3> */}
                                    </div>
                                </div>
                            )
                            :
                            null
                        }
                    </div>
                    <div>
                        {
                            this.state.open ?
                            (
                                <div>
                                    <div id="itemChart2">
                                        {/* <h3>Time Predict</h3> */}
                                    </div>
                                </div>
                            )
                            :
                            null
                        }
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