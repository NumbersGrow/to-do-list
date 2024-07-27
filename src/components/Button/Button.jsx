
import './Button.scss';

function Button({className,text}) {
  return (
    <button className={className} type="button">{text}</button>
  );
}

export default Button;