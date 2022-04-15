import PaperAir from '../../asset/resource/images/buttons/Paperair.png'

export const Button = (props) => {
  return <button type='button'  onClick={ props.click }><img src={ PaperAir }></img></button>
}