import React, { Component } from 'react';
import * as d3 from 'd3';
import ABCProfitSales0 from './ABCProfitSales.json';
import ABCProfitSales1 from './ABCProfitSales1.json';
import ABCProfitSales2 from './ABCProfitSales2.json';
import './ABCProfitSales.css'

class ABCProfitSales extends Component {

    state = {
        result0 : ABCProfitSales0,
        result1 : ABCProfitSales1,
        result2 : ABCProfitSales2
    }

    componentDidMount(){
        this.abcProfitSales();
    }

    abcProfitSales = () => {
        var margin = {top:0, bottom:20, left:20, right:20}
        var width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // // let width = 760, height = 500;
        const svg = d3.select('#ABCProfitSales')
                .append('svg')
                .attr("width", width)
                .attr("height", height);


        var profit = function(d){
        var num = d.profit;
        return +(num.toFixed(2));
        }

        var sales = function(d){
        var num = d['totalsales'];
        return +(num.toFixed(2));
        } 

        const render0 = data => {
            data.forEach(function(d){
                
                d.totalsales = sales(d)
                d["Total Sales"] = d.totalsales;
                d.profit = profit(d)
                d["Profit"] = d.profit
                d["Item Name"] = d.vitemname 
                d["Category Sales"] = d.ABC_category_sales;
                d["Category Profit"] = d.ABC_category_profit;
            })
            
            //var keys = d3.keys(data[0])
            var keys = ['Item Name', 'Total Sales', 'Category Sales', 'Profit', 'Category Profit']

            var table = d3.select('#ABCProfitSalesTable').append('table')
                            .attr("style", "margin-left: 50px")
                            .style("border-collapse", "collapse")
                            .style("border", "2px black solid"),
                        thead = table.append("thead"),
                        tbody = table.append("tbody");

            // append the header row
            thead.append("tr")
            .selectAll("th")
            .data(keys)
            .enter()
            .append("th")
                .text(function(column) { return column; });

            // create a row for each object in the data
            var rows = tbody.selectAll("tr")
                .data(data)
                .enter()
                .append("tr")
                //.style("font-color", function(d){ if(d.ABC_category_profit == d.ABC_category_sales){ return 'red';} });
            var abc = [];
            // create a cell in each row for each column
            var cells = rows.selectAll("td")
                .data(function(row) {
                    return keys.map(function(column) {
                        return {column: column, value: row[column]};
                    });
                })
                .enter()
                .append("td")
                .attr("style", "font-family: Courier") // sets the font style
                .style("background-color", function (d, i) {
                if ((d.value=="A") && (i==2)) {
                    return "green"}

                if (i==4 && d.value=="A") {
                        return "green"}

                if((d.value!="A")&&(i==4)){
                    return "red";
                }
                    
                })
                    .html(function(d) { return d.value; });
                console.log(keys)
        }
        render0(this.state.result0);



        const render1 = data => {

            data.forEach(function(d){
                d.letter = d.cat;
                d.frequency = d.counts; 
            });

            var margin = {top:20, bottom:20, left:20, right:20}
            var width = 400 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            var radius = 180;

            var svg = d3.select("#ABCProfitSalesPie1")
                    .append("svg")
                    .attr("width", width +  margin.left + margin.right)
                    .attr("height", height +  margin.left + margin.right)

            svg.append("text")
                .attr("x", width/2)
                .attr("y", 80)
                .style("text-anchor", "middle")
                .text("Sales Piechart")       

            var color = d3.scaleOrdinal(d3.schemeCategory10)

            var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2 + 50) + ")");

            var pie = d3.pie().sort(null)
            .value(function(d) {
                return d.frequency;
            });

            var piedata = pie(data);
            console.log(piedata)

            var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius - 50);
            
            var outerArc = d3.arc()
                .innerRadius(radius * .9)
            .outerRadius(radius * .9);

            //explode function of pie chart  
            var explode = function(x,index) {
            var offset = 5;
            var angle = (x.startAngle + x.endAngle) / 2;
            var xOff = Math.sin(angle)*offset;
            var yOff = -Math.cos(angle)*offset;
            return "translate("+xOff+","+yOff+")";
            }



        var path = g.selectAll(".arc")
            .data(piedata)
            .enter().append("g")
            .attr("class", "arc")

        path.append("path")
            .attr("d", arc)
            .attr('fill', function(d){return color(d.data.counts)})
            .attr("transform", explode);

        path.append("text")
            .attr("transform", function(d){ return "translate(" + arc.centroid(d) + ")"})
            .text(function(d){ return d.data.letter});
            

        path.append("svg:title")
            .text(function(d) {
                var t = "Products";
                return d.data.counts +"  " +t});
        }
        render1(this.state.result1);

        //////////////////////
        // PIE CHART 2
        /////////////////////


        const render2 = data => {

            data.forEach(function(d){
                d.letter = d.cat;
                d.frequency = d.counts; 
            });

            var margin = {top:20, bottom:20, left:20, right:20}
            var width = 400 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            var radius = 180;

            var svg = d3.select("#ABCProfitSalesPie2")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)

            svg.append("text")
                .attr("x", width/2)
                .attr("y", 80)
                .style("text-anchor", "middle")
                .text("Profit Piechart")


            var color = d3.scaleOrdinal(d3.schemeCategory10)

            var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2 +50) + ")");

            var pie = d3.pie().sort(null)
            .value(function(d) {
                return d.frequency;
            });

            var piedata = pie(data);
            console.log(piedata)

            var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius - 50);
            
            var outerArc = d3.arc()
                .innerRadius(radius * .9)
            .outerRadius(radius * .9);
            
            var explode = function(x,index) {
            var offset = 5;
            var angle = (x.startAngle + x.endAngle) / 2;
            var xOff = Math.sin(angle)*offset;
            var yOff = -Math.cos(angle)*offset;
            return "translate("+xOff+","+yOff+")";
            }


        var path = g.selectAll(".arc")
            .data(piedata)
            .enter().append("g")
            .attr("class", "arc")

        path.append("path")
            .attr("d", arc)
            .attr('fill', function(d){return color(d.data.counts)})
            .attr("transform", explode);

        path.append("text")
            .attr("transform", function(d){ return "translate(" + arc.centroid(d) + ")"})
            .text(function(d){ return d.data.letter});
            

        path.append("svg:title")
            .text(function(d) {
                var t = "Products";
                return d.data.counts +"  " +t});
        }
        render2(this.state.result2);
    }

    componentWillUnmount(){
        d3.select("svg").remove();
    }

    render() {
        return (
            <div id="ABCProfitSales">
                <div id="ABCProfitSalesTable"></div>
                <div id="ABCProfitSalesPie1"></div>
                <div id="ABCProfitSalesPie2"></div>
            </div>
        );
    }
}

export default ABCProfitSales;