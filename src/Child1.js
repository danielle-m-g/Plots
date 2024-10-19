import React, { Component } from "react";
import * as d3 from 'd3';

class Child1 extends Component {
    constructor(props) {
        super(props);
        this.state= {};
    }
    componentDidMount() {
        console.log(this.props.data1);
    }
    componentDidUpdate(){
        var data=this.props.data1
    
        console.log("ComponentDidUpdate", this.props.data1);

        var margin= {top: 70, right: 10, bottom: 70, left: 30},
            w = 510 - margin.left - margin.right,
            h= 400 - margin.top - margin.bottom;

        var container = d3.select(".child1_svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .select(".g_1")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // title
        container.append("text")
            .attr("x", w / 2 + 10)
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("font-weight", "regular")
            .text("Total Bill vs Tips");

        

        //add x axis
        var x_data = data.map(item => parseFloat(item.total_bill));
        const x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left, w]);
        container.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
        .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

        //add y axis
        var y_data = data.map(item => parseFloat(item.tip));
        const y_scale =d3.scaleLinear().domain([0,d3.max(y_data)]).range([h,0]);
        container.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'y_axis_g')
        .attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y_scale));

         // x title
        container.append("text")
        .attr("x", w / 2 +10)
        .attr("y", h + 40)
        .attr("text-anchor", "middle")
        .text("Total Bill");

        // y title
        container.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -h / 2)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .text("Tips");

        container.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", function(d){
                return x_scale(d.total_bill);
            })
            .attr("cy", function (d){
                return y_scale(d.tip);
            })
            .attr("r",3)
            .style("fill", "#69b3a2");

        //total bill vs tips
        // var self=this
        // d3.csv(tips,function(d){
        //     return{
        //         tip:parseFloat(d.tip),
        //         total_bill:parseFloat(d.total_bill),
        //         day:d.day
        //     }
        // })
    
        //console.log("ComponentDidUpdate", this.props.data1);

    }

    render() { 
        return(
            <svg className="child1_svg">
                <g className="g_1"></g>
            </svg>

        );
    }

}
export default Child1;