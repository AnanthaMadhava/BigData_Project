import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bargraph1 } from '../../actions/graphActions';
import axios from 'axios';
import * as d3 from 'd3';
import './BarChart.css';

class Barchart1 extends Component {

    // componentDidMount() {
    //     this.drawChart();
    // }
        
    // drawChart() {
    // const data = [12, 5, 6, 6, 9, 10];
    // let   w=700,
    // h=500;
    // const svg = d3.select("body")
    // .append("svg")
    // .attr("width", w)
    // .attr("height", h)
    // .style("margin-left", 100);
                    
    // svg.selectAll("rect")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d, i) => i * 70)
    //     .attr("y", (d, i) => h - 10 * d)
    //     .attr("width", 65)
    //     .attr("height", (d, i) => d * 10)
    //     .attr("fill", "green")
    // }

    state = {
        result: []
    }

    componentDidMount(){

        // if(!this.props.auth.isAuthenticated){
        //     this.props.history.push('/login');
        // }
        // const { bargraph1 } = this.props.graph;
        // if(bargraph1 !=null){
        //     console.log(bargraph1);
        // }

        // this.props.bargraph1();

        // this.barChart1();
        const headers = {
            'Authorization': localStorage.jwtToken
        }
        // console.log(headers);
        axios.post('/partywise_aggregated_sales/barchart1',{},{headers})
            .then(res => {
                // console.log(res.data.result)
                // console.log(this.state.result)
                this.setState({
                    result: [...res.data.result]
                })
                console.log(this.state.result)
                this.barChart1();
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    // componentWillReceiveProps(){
    //     const { bargraph1 } = this.props.graph;
    //     if(bargraph1 !=null){
    //         console.log(bargraph1);
    //     }
    // }

    barChart1 = () => {
        let width = 760, height = 500;
        const svg = d3.select('#barchart1')
                .append('svg')
                .attr("width", width)
                .attr("height", height);

        const render = data => {

            const xvalue =  d => d.value;
            const yvalue = d => d.key;

            var margin = {top: 70, right: 20, bottom: 50, left: 220};
            var innerwidth = width - margin.left - margin.right;
            var innerheight = height - margin.top - margin.bottom;

            const g = svg.append('g')
                        .attr('transform', "translate(" + margin.left + "," + margin.top + ")");


            // console.log(data)

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
                .attr("class", "rect1-axis-label")
                .attr('y', 40)
                .attr('x', innerwidth / 2)
                .attr("fill", "black")
                .text('Amount In Millions')



            const yscale = d3.scaleBand()
                        .domain(data.map(yvalue))
                        .range([0, innerheight])
                        .padding(0.1);

            const yaxis = d3.axisLeft(yscale);
                            
            //yaxis(g.append('g'));
            const yaxisG = g.append('g').call(yaxis)

            yaxisG.selectAll('.domain, .tick line')
                            .remove()

            yaxisG.append('text')
                .attr("class", "rect1-Yaxis-label")
                .attr('y', -195)
                .attr('x', -150)
                .attr("fill", "black")
                .attr("transform", "rotate(-90)")
                .text('Customer Names');
          
            g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr("class", "rect1")
            .attr('y', d => yscale(yvalue(d)))
            .attr('width', d => xscale(xvalue(d)))
            .attr('height', yscale.bandwidth());

            g.append('text')
                .attr("class", "rect1-title")
                .attr('y', -5)
                .attr('x', innerwidth/2)
                .text('Top 10 Customers')

            // console.log(innerwidth)
        };
        render(this.state.result);
    }

    componentWillUnmount(){
        d3.select("svg").remove();
    }
    
    render() {

        // const { bargraph1 } = this.props.graph;
        // if(bargraph1 !=null){
        //     console.log(bargraph1);
        // }
        
        return (
            <div id="barchart1"></div>
        );
    }
}

Barchart1.propTypes = {
    bargraph1: PropTypes.func.isRequired,
    graph: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    graph: state.graph
});

export default connect(mapStateToProps, { bargraph1 })(Barchart1);