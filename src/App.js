import React, { Component } from "react";
import "./App.css"
import Child1 from "./Child1";
import Child2 from "./Child2";
import * as d3 from "d3";
import tips from "./tips.csv"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }

  componentDidMount() {
    var self=this
    //promise then and catch(when error)
    d3.csv(tips).then(function(csv_data){
      self.setState({data:csv_data})
      //console.log((csv_data))
    })
    .catch(function(err){
      console.log(err)
    })
  }

  render(){
    return <div className="parent">
      <div className="child1"><Child1 data1={this.state.data}></Child1></div>
      <div className="child2"><Child2 data2={this.state.data}></Child2></div>
    </div>;
  }
}
export default App;