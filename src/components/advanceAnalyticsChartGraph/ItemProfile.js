import React, { Component } from 'react';
import * as d3 from 'd3';
import ItemProfileDate from './ItemProfile.json';
import './ItemProfile.css';

class ItemProfile extends Component {

    state = {
        result : ItemProfileDate
    }

    componentDidMount() {
        this.itemProfile();
    }

    itemProfile = () => {
        let width = 680, height = 500;
        const svg = d3.select('#itemProfile')
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
                const xvalue = d => d.profit;

                var margin = {top: 35, right: 30, bottom: 50, left:210};
                var innerwidth = width - margin.left - margin.right;
                var innerheight = height - margin.top - margin.bottom;

                const g = svg.append('g')
                            .attr('transform', "translate(" + margin.left + "," + margin.top + ")");


                console.log(data)

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
                    .attr("class", "item_axis-label")
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
                    .attr("class", "item_title")
                    .attr('y', -5)
                    .attr('x', innerwidth/2)
                    //.style("font-size", "20px")
                    .text("Top10 items based on profit")

                console.log(innerwidth)
            };    
            render(this.state.result);

            // d3.json("bar.json", function(data){
            //         console.log(data);
            // data.forEach(d => {    
            //     d.vitemname = d.vitemname;
            //    d.profit = +d.profit;                            
            //     })
            //      console.log(data)
            //     render(data);
            //  }) ;
    }

    render() {
        return (
            <div id="itemProfile"></div>
        );
    }
}

export default ItemProfile;