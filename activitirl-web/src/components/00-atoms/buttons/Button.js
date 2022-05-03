import './style.css'

const Button = ({text, onPress}) => {
    return (
        <button className="btn" onClick={onPress}>
            {text}
        </button>
    )
}

export default Button;