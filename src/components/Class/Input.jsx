import React, { Component } from "react";

export class Input extends Component {
  state = {
    value: ''
  }

  render() {
    return <>
    <input type="text" value={ this.props.value } 
      onChange={ this.props.change }/>
    </>
    
  }
}