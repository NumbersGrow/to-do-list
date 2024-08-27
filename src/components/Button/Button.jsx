
import './Button.scss';

function Button({className,onClick,text}) {
  return (
    <button className={className} onClick={onClick} type="button">{text}</button>
  );
}

export default Button;