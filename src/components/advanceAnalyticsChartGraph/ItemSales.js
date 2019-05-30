import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API_URL } from '../../actions/types';
import axios from 'axios';
import * as d3 from 'd3';
import ItemSalesData from './ItemSales.json';
import './ItemSales.css';

class ItemSales extends Component {

    state = {
        result : []
    }

    componentDidMount(){
        const headers = {
            'X-USER-ID': this.props.auth.user.username,
            'X-USER-TOKEN': localStorage.jwtToken
        }
        // console.log(headers);
        axios.get(`${API_URL}/top10_items_on_sales/itemSales`,{headers})
            .then(res => {
                // console.log(res.data.top10_items_based_on_sales)
                // console.log(this.state.result)
                this.setState({
                    result: [...res.data.top10_items_based_on_sales]
                })
                // console.log(this.state.result)
                this.itemSales();
            })
            .catch(err => {
                console.log(err)
            })
    }

    itemSales = () => {
        let width = 680, height = 500;
        const svg = d3.select('#itemSales')
                    .append('svg')
                    .attr("width", width)
                    .attr("height", height);
        var dparse = d3.timeParse("%B-%Y")
        var dformat = d3.timeFormat("%B-%Y")

            // const width = svg.attr('width', width);
            // const height = svg.attr('height', height);
            var color = d3.scaleOrdinal().range(d3.schemeCategory10)


            const render = data => {

                const yvalue =  d => d.vitemname;
                const xvalue = d => d.totalsales;

                var margin = {top: 35, right: 30, bottom: 50, left:220};
                var innerwidth = width - margin.left - margin.right;
                var innerheight = height - margin.top - margin.bottom;

                const g = svg.append('g')
                            .attr('transform', "translate(" + margin.left + "," + margin.top + ")");


                // console.log(data)

                function sortAscending(a, b){
                    return a.vitemname - b.vitemname;
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
                    .text('Amount')

              
                const yscale = d3.scaleBand()
                            .domain(data.map(yvalue))
                            .range([0, innerheight])
                            .padding(0.1);

                const yaxis = d3.axisLeft(yscale);
                                
                //yaxis(g.append('g'));
                const yaxisG = g.append('g').call(yaxis)

                yaxisG.selectAll('.domain, .tick line')
                                .remove()

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
                .attr("fill", function(d){ return color(d.vitemname)});

              g.append('text')
                    .attr("class", "item_sales_title")
                    .attr('y', -5)
                    .attr('x', innerwidth/2)
                    .text("Top10 items based on sales")

                // console.log(innerwidth)
            };    
            render(this.state.result)

            // d3.json("bar.json", function(data){
            //         console.log(data);
            // data.forEach(d => {    
            //     d.vitemname = d.vitemname;
            //    d.totalsales = +d.totalsales;                            
            //     })
            //      console.log(data)
            //     render(data);
            //  }) ;
    }

    componentWillUnmount(){
        d3.select("svg").remove();
    }

    render() {
        return (
            <div id="itemSales"></div>
        );
    }
}

ItemSales.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ItemSales);