export const Input = (props) => {
  return <>
    <textarea autoFocus type="text" onKeyDown={props.onKey}
      value={props.value}
      onChange={props.change} placeholder="Тут пусто" />
  </>
}