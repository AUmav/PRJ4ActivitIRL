import './style.css'

const BigIconContainerButton = ({iconType, onClick}) => {
    return(
        <div className="proper-align">
            <span className="material-icons icon-styling" onClick={onClick}>{iconType}</span>
        </div>
    )
}

export default BigIconContainerButton;

/* Types of icons include:
    room - for google location icon 
    event - for event type icon
    schedule - for date/time icon (watch)
*/