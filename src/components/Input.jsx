import React, { Component } from "react";

export class Input extends Component {
  state = {
    value: ''
  }

  hendlerInput = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    return <>
    <p>{ this.state.value }</p>
    <input type="text"  value={ this.state.value } onChange={ this.hendlerInput }/>
    </>
    
  }
}