import React, { Component } from "react";
import { Button } from "./Button";
import { Input } from "./Input";


export class Form extends Component {
  state = {
    name: 'Click'
  }

  render() { 
  return  <>
          <Input />
          <Button name= { this.state.name } />
          </>

  }
}