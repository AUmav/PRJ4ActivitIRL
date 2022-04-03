import './style.css'

const SubmitButton = ({text, onClick}) => {
    return (
        <input className='btn' type="submit" value={text} onClick={() => onClick}/>
    )
}

export default SubmitButton;