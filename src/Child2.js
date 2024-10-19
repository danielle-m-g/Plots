import React, { Component } from "react";
import * as d3 from 'd3';

class Child2 extends Component {
    constructor(props) {
        super(props);
        this.state= {};
    }
    componentDidMount() {
        console.log(this.props.data2);
    }
    componentDidUpdate(){
        var data=this.props.data2
    
        console.log("ComponentDidUpdate", this.props.data2);

        var margin= {top: 70, right: 10, bottom: 70, left: 70},
            w = 510 - margin.left - margin.right,
            h= 400 - margin.top - margin.bottom;
        
        var container = d3.select(".child2_svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .select(".g_2")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
        // title
        container.append("text")
            .attr("x", w / 2)
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("font-weight", "regular")
            .text("Average Tip by Day");

        // average
        const averageTips = d3.rollup(data, v => d3.mean(v, d => parseFloat(d.tip)), d => d.day);
        const avgTipData = Array.from(averageTips, ([day, avgTip]) => ({ day, avgTip }));

        //x axis
        const x = d3.scaleBand().range([0, w]).domain(avgTipData.map(d => d.day)).padding(0.1);
        container.append("g").attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x));

        //y axis
        const y = d3.scaleLinear().range([h, 0]).domain([0, d3.max(avgTipData, d => d.avgTip)]);
        container.append("g").call(d3.axisLeft(y));
        

        // x title
        container.append("text")
            .attr("x", w / 2)
            .attr("y", h + 40)
            .attr("text-anchor", "middle")
            .text("Day");

        //y title
        container.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -h / 2)
            .attr("y", -40)
            .attr("text-anchor", "middle")
            .text("Average Tip");

        container.selectAll(".bar")
            .data(avgTipData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.day))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.avgTip))
            .attr("height", d => h - y(d.avgTip))
            .attr("fill", "#69b3a2");
    }

    render() { 
        return (
            <svg className="child2_svg">
                <g className="g_2"></g>
            </svg>
        );
    }
}

export default Child2;