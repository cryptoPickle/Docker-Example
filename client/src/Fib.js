import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ""
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  fetchValues = async () => {
    const {data} = await axios.get('/api/values/current');
    this.setState({values: data});
  }

  fetchIndexes = async() => {
    const {data} = await axios.get('/api/values/all');
    this.setState({seenIndexes: data})
  }

  renderIndexes = () => { 
    return this.state.seenIndexes.map(({number}) => number).join(', ');
  }

  renderCalculatedValues = () => {
    return Object.keys(this.state.values).map((key, index) => 
    <div key={index}>For {key} calculated {this.state.values[key]}</div>
    )
  }

  onChangeHandler = (e) => {
    const {value} = e.target;
    this.setState({index: value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/values', {
      index: this.state.index
    })
    this.setState({index: ''});
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index</label>
          <input  value={this.state.index}
            onChange={this.onChangeHandler}
          />
          <button>Submit</button>
        </form>
        
        <h3>Indexes I have seen:</h3>
          {this.renderIndexes()}
        <h3>Calculated Values</h3>
          {this.renderCalculatedValues()}
      </div>
    )
  }
}


export default Fib;