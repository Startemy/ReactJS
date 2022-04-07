import React, { Component } from 'react';

export class Button extends Component {
  render() {
    console.log(this.props)
    return <button>click</button>
  }
}
