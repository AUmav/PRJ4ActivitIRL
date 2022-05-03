const IconContainer = ({iconType}) => {
    return(
        <span className="material-icons ">{iconType}</span>
    )
}

export default IconContainer;

/* Types of icons include:
    room - for google location icon 
    event - for event type icon
    schedule - for date/time icon (watch)
*/