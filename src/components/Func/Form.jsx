import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";


export const Form = () => {
  const [name, setName] = useState('send')
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState([])
  const [visible, setVisible] = useState(true)
  let [id, setId] = useState(1)
  
  const valueId = {
    id: id,
    value: value
  }

  /**Добавляем текст в массив отчищаем value и изменяем id */
  const handleClick = () => {
    setMessages([...messages, valueId])
    setValue('')
    setId(id += 1)
  }

  /**Получаем текст из textarea */
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  /**Меняем состояние нажатия Enter в textare */
  const onKey = (event) =>  {
    if (event.which == 13 && !event.shiftKey) {        
      event.preventDefault();
      handleClick()
    }
  }

  setTimeout(() => {
  const block = document.querySelector(".message-text");
  block.scrollTop = block.scrollHeight;
  }, 50)

  return  <form className="message" action="#">
    { visible  && <ul className="message-text">
      { messages.map((message) => 
        <li key={ message.id }>{ message.value } </li>
      )}
    </ul>}

    <div>
    <Input change={ handleChange } value={ value } onKey={ onKey }/>
    <Button click={ handleClick } />
    </div>
    
    <button onClick={ () => setVisible(!visible) }>
      { visible ? 'hide messages' : 'show messages' }</button>
    </form>
}