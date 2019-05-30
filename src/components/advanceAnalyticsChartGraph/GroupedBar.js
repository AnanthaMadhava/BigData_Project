import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API_URL } from '../../actions/types';
import axios from 'axios';
import * as d3 from 'd3';
import GroupedBarData from './GroupedBar.json'

class GroupedBar extends Component {

    state = {
        result: []
    }

    componentDidMount(){
        const headers = {
            'X-USER-ID': this.props.auth.user.username,
            'X-USER-TOKEN': localStorage.jwtToken
        }
        // console.log(headers);
        axios.get(`${API_URL}/get_monthly_sales_yearwise/groupedBar`,{headers})
            .then(res => {
                // console.log(res.data.monthly_sales_yearwise)
                // console.log(this.state.result)
                this.setState({
                    result: [...res.data.monthly_sales_yearwise]
                })
                // console.log(this.state.result)
                this.groupedBar();
            })
            .catch(err => {
                console.log(err)
            })
    }

    groupedBar = () => {
        var margin = {top: 40, right: 20, bottom: 20, left: 50},
            width = 680 - margin.left - margin.right,
            height = 490 - margin.top - margin.bottom;
        var svg = d3.select("#groupBarChart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.left + margin.right);
        var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        var x1 = d3.scaleBand()
            .padding(0.05);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var z = d3.scaleOrdinal()
            .range(["#d0743c", "#ff8c00"]);

        const render = data => {
            //console.log(data)

            var columns = d3.keys(data[0])

            var keys = columns.slice(0, 2);
            // console.log(keys)

            x0.domain(data.map(function(d) { return d.month; }));
            x1.domain(keys).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

            g.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d) { return "translate(" + x0(d.month) + ",0)"; })
                .selectAll("rect")
                .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter().append("rect")
                .attr("x", function(d) { return x1(d.key); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", x1.bandwidth())
                .attr("height", function(d) { return height - y(d.value); })
                .attr("fill", function(d) { return z(d.key); });

            g.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x0));

            g.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s"))
                .append("text")
                .attr("x", 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("sales");

            // var legend = g.append("g")
            //     .attr("font-family", "sans-serif")
            //     .attr("font-size", 10)
            //     .attr("text-anchor", "end")
            //   .selectAll("g")
            //   .data(keys.slice().reverse())
            //   .enter().append("g")
            //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            // console.log(keys.slice().reverse());

            var legend = g.selectAll(".legend")
                .data(keys)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width - 50)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill",function(d) { return z(d); });

            legend.append("text")
                .attr("x", width - 50)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .style("font-size", "18px")
                .text(function(d) { return d; });
        }
        render(this.state.result)
    }

    componentWillUnmount(){
        d3.select("svg").remove();
    }

    render() {
        return (
            <div id="groupBarChart"></div>
        );
    }
}

GroupedBar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(GroupedBar);