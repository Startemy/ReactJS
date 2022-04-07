import React, { Component, Fragment } from 'react';


export class Input extends Component {
  state = {
    value: ''
  }

  hendleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    return  <Fragment>
              <p>{ this.state.value } </p>
              <input type='text' value={this.state.value}  onChange={ this.hendleChange }/>
            </Fragment>
  }
}

