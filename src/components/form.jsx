import React, { Component, Fragment } from 'react';
import { Button } from './button';
import { Input } from './input';

export class Form extends Component {
  state = {
    name: 'click'
  }
  render() {
    return  <Fragment>
            <Input />
            <Button name={ this.state.name }/>
            </Fragment>
  }
}
