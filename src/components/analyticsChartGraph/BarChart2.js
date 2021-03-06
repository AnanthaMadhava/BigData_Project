import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bargraph2 } from '../../actions/graphActions';
import { API_URL } from '../../actions/types';
import axios from 'axios';
import * as d3 from 'd3';
import './BarChart2.css';

class BarChart2 extends Component {

    state = {
        result: []
    }

    componentDidMount(){
        // if(!this.props.auth.isAuthenticated){
        //     this.props.history.push('/login');
        // }

        // this.props.bargraph2();

        // this.barChart2();
        const headers = {
            'X-USER-ID': this.props.auth.user.username,
            'X-USER-TOKEN': localStorage.jwtToken
        }
        // console.log(headers);
        axios.get(`${API_URL}/itemwise_aggregated_salse_in_amt/barchart2`,{headers})
            .then(res => {
                // console.log(res.data["item wise aggregated sales"])
                // console.log(this.state.result)
                this.setState({
                    result: [...res.data["item wise aggregated sales"]]
                })
                // console.log(this.state.result)
                this.barChart2();
            })
            .catch(err => {
                console.log(err)
            })
    }

    barChart2 = () => {
        let width = 660, height = 500;
        const svg = d3.select('#barchart2')
                .append('svg')
                .attr("width", width)
                .attr("height", height);

        const render = data => {

            const xvalue =  d => d.value;
            const yvalue = d => d.key;

            var margin = {top: 70, right: 20, bottom: 50, left: 200};
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
                .attr("class", "rect2-axis-label")
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
                .attr("class", "rect2-Yaxis-label")
                .attr('y', -170)
                .attr('x', -170)
                .attr("fill", "black")
                .attr("transform", "rotate(-90)")
                .text('Name Of Items');


            

            g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'rect2')
            .attr('y', d => yscale(yvalue(d)))
            .attr('width', d => xscale(xvalue(d)))
            .attr('height', yscale.bandwidth());

            g.append('text')
                .attr("class", "rect2-title")
                .attr('y', -3)
                .attr('x', innerwidth/2-40)
                .text('Top 10 Items')

            // console.log(innerwidth)

            

        };
        render(this.state.result);
    }

    componentWillUnmount(){
        d3.select("svg").remove();
    }

    render() {

        // const { bargraph2 } = this.props.graph;
        // if(bargraph2 != null){
        //     console.log(bargraph2);
        // }

        return (
            <div id="barchart2"></div>
        );
    }
}

BarChart2.propTypes = {
    bargraph2: PropTypes.func.isRequired,
    graph: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    graph: state.graph
});

export default connect(mapStateToProps, { bargraph2 })(BarChart2);