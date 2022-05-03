import './style.css'

const Limits = ({ageLimitLower, ageLimitHigher, deadline, participantLimit, numberOfParticipants}) => {

    
    
    return (
        <div className="limits">
            {ageLimitLower != "0" && 
                <p>Aldersgrænse: {ageLimitLower} - {ageLimitHigher}</p>
            }
            
            {deadline != "0001-01-01 - 00:00" &&
                <p>Deadline for tilmelding: {deadline}</p>
            }
            {participantLimit != "0" 
                ? <p>Max antal deltagere: {participantLimit} + nuværende antal deltagere: {numberOfParticipants}</p>    
                : <p>Nuværende antal deltagere: {numberOfParticipants}</p>    
            }
            
        </div>
    )
}

export default Limits

/*
    Maybe there should be a default? In case there are no limits?
    Or if there are no limits at all, this molecule is omitted from the details page?
    ...
*/