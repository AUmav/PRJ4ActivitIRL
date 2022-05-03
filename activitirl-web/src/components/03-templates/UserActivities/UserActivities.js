import BigButton from "../../00-atoms/buttons/BigButton";

//import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const UserActivities = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // This variable changes state, when the user clicks a button
    // Shows either events created by the user, or events the user participates in
    const [createdBy, setCreatedBy] = useState(false);
    const [buttonText, setButtonText] = useState("Se dine oprettede aktiviteter");
    
    const loadActivities = (e) => {
        e.preventDefault();

        if(createdBy==false)
        {
            setButtonText("Se aktiviteter du deltager i");
            setCreatedBy(true);
            
            //testing
            console.log("Button clicked");
            console.log(createdBy);
        }
        if(createdBy==true)
        {
            setButtonText("Se dine oprettede aktiviteter");
            setCreatedBy(false);
            
            //testing
            console.log("Button clicked");
            console.log(createdBy);
        }

    
        
    }

    return(
        <div>
            <BigButton onPress={loadActivities} text={buttonText}></BigButton>
            {createdBy && 
            <p>Her kan du se hvilke aktiviteter du har oprettet</p>}
            
            {!createdBy && 
            <p>Her kan du se hvilke aktiviteter du deltager i</p>}
        </div>       
    );
}

export default UserActivities;