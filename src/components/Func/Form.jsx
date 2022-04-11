import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";


export const Form = () => {
  const [name, setName] = useState('send')
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState([])
  const [visible, setVisible] = useState(true)

  const handleClick = ()=> {
    setMessages([...messages, value])
    setValue('')
  }

  const handleChange = (event)=> {
    setValue(event.target.value)
  }

  return  <div className="message">
    { visible  && <ul>
      { messages.map(message => 
        <li>{ message }</li>
      )}
    </ul>}

    <div>
    <Input change={ handleChange } value={ value } />
    <Button name={ name } click={ handleClick } />
    </div>
    
    <button onClick={ () => setVisible(!visible) }>
      { visible ? 'hide messages' : 'show messages' }</button>
    </div>
}