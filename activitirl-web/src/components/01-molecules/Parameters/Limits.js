import './style.css'

const Limits = ({ageLimit, deadline, participantLimit, numberOfParticipants}) => {
    return (
        <div className="limits">
            <p>Aldersgrænse: {ageLimit}</p>
            <p>Deadline for tilmelding: {deadline}</p>
            <p>Max antal deltagere: {participantLimit} + nuværende antal deltagere: {numberOfParticipants}</p>    
        </div>
    )
}

export default Limits

/*
    Maybe there should be a default? In case there are no limits?
    Or if there are no limits at all, this molecule is omitted from the details page?
    ...
*/