import PaperAir from '../../asset/resource/images/buttons/Paperair.png'

export const Button = (props) => {
  return <button type='submmit' onClick={ props.click }><img src={ PaperAir }></img></button>
}