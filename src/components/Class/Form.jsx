import React, { Component } from 'react';
import { Button } from './Button';
import { Input } from './Input';

export class Form extends Component {
  state = {
    name: 'Click',
    value: '',
    messages: [],
    visible: true,
  };

  handleClick = () => {
    this.setState({ messages: [...this.state.messages, this.state.value] });
    this.setState({ value: '' });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <>
        {this.state.visible && (
          <ul>
            {this.state.messages.map((message, indx) => (
              <li key={indx}>{message}</li>
            ))}
          </ul>
        )}
        <Input change={this.handleChange} value={this.state.value} />
        <Button name={this.state.name} click={this.handleClick} />
        <br />

        <button onClick={() => this.setState({ visible: !this.state.visible })}>
          {this.state.visible ? 'hide' : 'show'}
        </button>
      </>
    );
  }
}
