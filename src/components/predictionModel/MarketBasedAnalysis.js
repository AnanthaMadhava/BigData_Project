import React, { Component } from 'react';
import * as d3 from 'd3';
import MarketBasedAnalysisData from './MarketBasedAnalysis.json';
import './MarketBasedAnalysis.css';

class MarketBasedAnalysis extends Component {

    state = {
        result: MarketBasedAnalysisData
    }

    componentDidMount(){
        this.bubbleChart();
    }

    bubbleChart = () => {
        var width = 950;
        var height = 750;

        // var svg = d3.select("g")
        //         .attr("transform", "translate("+ width/2+", "+height/2+")")

        var g = d3.select("#bubbleChart")
                    .append("svg")
                    .attr("height", height)
                    .attr("width", width)

        var svg = g.append("g")
                    .attr("transform", "translate(-100, -0)")


        var div = d3.select("body").append("div")	
                    .attr("class", "tooltip")				
                    .style("opacity", 0);



        const render = data => {

            // data = [];
            // for(a in sale.result){
            //     data.push(sale.result[a]);
            // }
            

            data.forEach(function(d) {
                d.Amount = +d.qty;
                d.Party_Name = d.item;
            });

            console.log(data)

            var color = d3.scaleOrdinal()
                    .domain(data.map(function(d){ return d.Party_Name;}))
                    .range(['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6',
                    '#ffe9a8','#b9bfe3','#fddaec','#cccccc','#66757F','#ff6bb2','#ccff66','#ff66ff','#6ef230',
                    '#999966','#ff997a','#00ff91','#ff85e2','#85fff3','#ffef85','#ccff91','#a7ab7e','#90aba9',
                    '#ed72eb','#ff8080','#663300','#ffff99','#cc8033']);


            var radiusScale = d3.scaleSqrt().domain(d3.extent(data, function(d) { return d.Amount; }))
                                            .range([15, 150])

            const data1 = d3.extent(data, function(d) { return d.Amount; });
            //console.log(data1)
            
            var simulation = d3.forceSimulation()
                                .force("x", d3.forceX(width/2).strength(0.05))
                                .force("y", d3.forceY(height/2).strength(0.05))
                                .force("collide", d3.forceCollide(function(d) {
                                        return radiusScale(d.Amount)+1;
                                            }))

            var number = d3.format(".2s")

            var circles = svg.selectAll("circle")
                            .data(data)
                            .enter()
                            .append("circle")
                            .attr("class", "bubble_circle")
                            .attr("r", function(d){return radiusScale(d.Amount)})
                            .attr("fill", function(d){return color(d.Party_Name)})
                            .on("mouseover", function(d, i) {
                                d3.select(this).attr("r", radiusScale(d3.max(data1))+20);
                                svg.append("text")
                                    .attr("id", "bubbleChartText" + i)
                                    .attr("x",  function() {return d.x})
                                    .attr("y",  function() {return d.y})
                                    .text(function(){return d.Party_Name+" : "+number(d.Amount)})
                                    .attr("fill",  "black")
                                    .style("text-anchor", "middle");
                                            
                                // div.transition()		
                                //     .duration(200)		
                                //     .style("opacity", .9);		
                                // div	.html(d.Party_Name + "<br/>"  + d.Amount)	
                                //     .style("left", (d3.event.pageX) + "px")		
                                //     .style("top", (d3.event.pageY - 28) + "px");	
                                })					
                            .on("mouseout", function(d, i) {	
                                d3.select(this).attr("r", function(){return radiusScale(d.Amount)})
                                d3.select("#bubbleChartText" + i).remove();	
                                div.transition()		
                                    .duration(500)		
                                    .style("opacity", 0);	
                            });

                    svg.append('text')
                            .attr("class", "bubble_title")
                            .attr('y', 20)
                            .attr('x', width/2)
                            .text('Market Based Analysis')

            

            simulation.nodes(data)
                    .on('tick', ticked)

            function ticked(){
                circles
                .attr("cx", function(d){return d.x})
                .attr("cy", function(d){return d.y})
            }

        // var g1 = svg.append("g")
        //             .attr("transform", "translate(500, )")
            var legend = svg.selectAll(".legend")
            .data(data).enter()
            .append("g")
            .attr("class","legend")
            .attr("transform", "translate(" + 750 + "," + 40 + ")");
            
        
            legend.append("rect")
            .attr("x", 0) 
            .attr("y", function(d, i) { return 20 * i; })
            .attr("width", 15)
            .attr("height", 15)
                .style("fill", function(d) { return color(d.item)});
            
        
            legend.append("text")
            .attr("x", 25) 
                .attr("text-anchor", "start")
            .attr("dy", "1em") 
            .attr("y", function(d, i) { return 20 * i; })
            .text(function(d) {return d.item;})
            .attr("font-size", "12px"); 
            
                
            legend.append("text")
            .attr("class", "bubble_text_title")
            .attr("x",31) 
            .attr("dy", "-.2em")
            .attr("y",-10)
            .text("Item Type"); 
        
        }
        render(this.state.result);
    }

    render() {
        return (
            <div>
                <div id="bubbleChart">
                    <div id="bubbleChartText"></div>
                </div>
            </div>
        );
    }
}

export default MarketBasedAnalysis;