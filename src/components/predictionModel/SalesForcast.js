import React, { Component } from 'react';
import * as d3 from 'd3';
import SalesForcast0 from './SalesForcast.json';
import SalesForcast1 from './SalesForcast1.json';
import SalesForcast2 from './SalesForcast2.json';
import './SalesForcast.css';

class SalesForcast extends Component {

    state = {
        result0 : SalesForcast0,
        result1 : SalesForcast1,
        result2 : SalesForcast2
    }

    componentDidMount(){
        this.salesForcast();
    }

    salesForcast = () => {
        // Get the data
        const render0 = data => {
            // if (error) throw error;
            
            // parse the date / time
            var parseTime = d3.timeParse("%d-%m-%Y");
            
            var array1 = data[0]["history"];
            var array2 = data[0]["prediction"];
            var data1 = array1.concat(array2)
            console.log(array1)
            
            
            // format the data
            array1.forEach(function(d) {
            d.date = parseTime(d.ds);
            d.open = 0;
            d.close = 0;
            d.actual = 0;
            d.y = +d.y;
            });
            array2.forEach(function(d) {
            d.date = parseTime(d.ds);
            d.open = +d.yhat_lower;
            d.close = +d.yhat_upper;
            d.actual = +d.yhat;
            d.y = 0;
            });
            console.log(data)
            
            
            
            // set the dimensions and margins of the graph
            var margin = {top: 40, right: 20, bottom: 60, left: 60},
            width = 800 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
            
            
            
            // set the ranges
            var x = d3.scaleTime().range([0, width]);
            var y = d3.scaleLinear().range([height, 0]);
            
            // define the 1st line
            var valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close) });
            
            // define the 2nd line
            var valueline2 = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.open); });
            
            var valueline3 = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.actual); });
            
            var valueline4 = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.y); });
            // append the svg obgect to the body of the page
            // appends a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            //<div id="graph"></div>
            var svg = d3.select("#salesForcastGraph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
            
                svg.append("text")
                .attr("x", (width / 2))             
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .style("fill", "black") 
                .text("Prediction Chart");
            
            // Scale the range of the data
            x.domain(d3.extent(data1, function(d) { return d.date; }));
            y.domain([0, d3.max(data1, function(d) {
            return Math.max(d.close, d.open, d.actual, d.y); })]);
            
            // Add the valueline path.
            svg.append("path")
            .data([array2])
            .attr("class", "line")
            .style("stroke", "#99ff99")
            .attr("d", valueline);
            
            // Add the valueline2 path.
            svg.append("path")
            .data([array2])
            .attr("class", "line")
            .style("stroke", "#66ff66")
            .attr("d", valueline2);
            
            svg.append("path")
            .data([array2])
            .attr("class", "line")
            .style("stroke", "#00e600")
            .attr("d", valueline3);
            
            var his = svg.append("path")
            .data([array1])
            .attr("class", "line")
            //.style("stroke", "red")
            .attr("d", valueline4);
            
            svg.selectAll("circle")
            .data(array1)
            .enter()
            .append("circle")
            .attr("cx", function(d){return x(d.date)})
            .attr("cy", function(d){return y(d.y)})
            .attr("r", 2)
            .attr("fill", "RoyalBlue");
            
            // Add the X Axis
            svg.append("g")
            
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
            
            // Add the Y Axis
            svg.append("g")
            .call(d3.axisLeft(y));
        }
        render0(this.state.result0);
        
        
        const render1 = data => {
        
            function tabulate(data, columns) {
                var table2 = d3.select("#salesForcastTable")
                var caption = table2.append('table2')
                caption.html("Next 7 days forcast")
                .style("font-size", "18px")
                .style("font-weight","bold")
                table2.append('table')
                //.attr("style", "margin-left: 2500px")
                var thead = table2.append('thead')
                var	tbody = table2.append('tbody');
        
                // append the header row
                thead.append('tr')
                    .selectAll('th')
                    .data(columns).enter()
                    .append('th')
                    .text(function (column) { return column; });
        
                // create a row for each object in the data
                var rows = tbody.selectAll('tr')
                    .data(data)
                    .enter()
                    .append('tr')
                    .on("mouseover", function(d){
                    d3.select(this)
                        .style("background-color", "orange");
                    })
                    .on("mouseout", function(d){
                    d3.select(this)
                        .style("background-color","transparent");
                    });
        
                // create a cell in each row for each column
                var cells = rows.selectAll('td')
                    .data(function (row) {
                    return columns.map(function (column) {
                        return {column: column, value: row[column]};
                        console.log(row)
                    });
                    })
                    .enter()
                    .append('td')
                    .text(function (d) { return d.value; })
        
                return table2;
            }
            // render the table(s)
            tabulate(data, ['Date','Lower','Prediction','Upper']); // 2 column table
        }
        render1(this.state.result1);
        
        const render2 = data => {
        
            function tabulate(data, columns) {

                var table1 = d3.select("#salesForcastTable1")
                var caption = table1.append('table1')
                .text("Current and next month forcast")
                .style("font-size", "18px")
                .style("font-weight","bold")
                .style("color","#000000")
                table1.append('table')
                .attr("style", "margin-right: 20px")
                var thead = table1.append('thead')
                var	tbody = table1.append('tbody');
        
                // append the header row
                thead.append('tr')
                    .selectAll('th')
                    .data(columns).enter()
                    .append('th')
                    .text(function (column) { return column; });
        
                // create a row for each object in the data
                var rows1 = tbody.selectAll('tr')
                    .data(data)
                    .enter()
                    .append('tr')
                    .on("mouseover", function(d){
                    d3.select(this)
                        .style("background-color", "orange");
                    })
                    .on("mouseout", function(d){
                    d3.select(this)
                        .style("background-color","transparent");
                    });;
        
                // create a cell in each row for each column
                var cells1 = rows1.selectAll('td')
                    .data(function (row) {
                    return columns.map(function (column) {
                        return {column: column, value: row[column]};
                        console.log(data)
                    });
                    })
                    .enter()
                    .append('td')
                    .text(function (d) { return d.value; })
                
        
                return table1;
            }
            // render the table(s)
            tabulate(data, ['Month_Year','Lower','Prediction','Upper']); // 2 column table
        }
        render2(this.state.result2);
    }

    render() {
        return (
            <div>
                <div id="salesForcast">
                    <div id="salesForcastTable"></div>
                    <div id="salesForcastTable1"></div>
                </div>
                <div id="salesForcastGraph"></div>   
            </div>
        );
    }
}

export default SalesForcast;