import './style.css'

const BigButton = ({text, onPress}) => {
    return (
        <button type="button" className="btn big-btn" onClick={onPress}>
            {text}
        </button>
    )
}

export default BigButton;