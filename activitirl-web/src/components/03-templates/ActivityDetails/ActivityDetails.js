import ImageContainer from "../../00-atoms/images/ImageContainer";
import HeadlineDescriptionSet from "../../01-molecules/Descriptions/HeadlineDescriptionSet";
import Limits from "../../01-molecules/Parameters/Limits";
import ParameterSet from "../../02-organisms/PostDetails/ParameterSet";
import ProfilePictureName from "../../01-molecules/Profile/ProfilePictureName";
import BigButton from "../../00-atoms/buttons/BigButton";
import './style.css'

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import TitleText from "../../00-atoms/text/TitleText";
import jwtDecode from "jwt-decode"

// https://stackoverflow.com/questions/68828342/react-dynamic-route-for-webpage
const ActivityDetails = () => {
    // Using the token to check if the current user has created the event
    // **** FIX DETTE
    let token = localStorage.getItem("loginToken");   
    let email = "" ;
    if (token)
    {
        let payload = jwtDecode(token);
        email = payload["email"];
    }
    
    const [userEmail, setUserEmail] = useState(null);

    const {id} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [event, setEvent] = useState([]);
    

    let url = "https://prj4-api.azurewebsites.net/api/event/"
    url += id;
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            //credentials: 'include',

        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                console.log("loaded")
                console.log(result);

                // Parsing the dateTime strings
                // For now using the date from the result object -> it loads faster, preventing errors
                //result.date = dateFormat(result.date);
                result.registrationDeadline = dateFormat(result.registrationDeadline);
                
                setEvent(result);
                console.log(result);
                setUserEmail(result.createdBy.emailAddress);        

            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.log("error")
            }
        )
    }, [])

    const joinEvent = (e) => {
        e.preventDefault();
        if(!token)
        {
            alert("Du skal være logget ind for at tilmelde dig en aktivitet!");
        }
        if(token)
        {
            alert("Du er nu tilmeldt denne aktivitet!");
            console.log("User joins event.");
        }        
    };

    function dateFormat(date)
    {
        let dateArray = date.split('T');
        let timeArray = dateArray[1].split(':');

        let formattedDateTime = dateArray[0]+" - "+timeArray[0]+":"+timeArray[1];
        console.log(formattedDateTime);
        return formattedDateTime;
    }

    if(token && (email == userEmail)) 
    {
        if(email == userEmail)
            {
                return(
                    <div className="details-container">
                        <ImageContainer/>
            
                        <div className="profile-title-flex">
                            <TitleText title={event.title} className="title-text"/>
                            {/* <ProfilePictureName name={event.createdBy.firstName}></ProfilePictureName> */}
                        </div>            
            
                        <ParameterSet activityParam={event.activity} cityParam={event.city} zipCodeParam={event.zipCode} dateParam={event.date}></ParameterSet>            
                        <HeadlineDescriptionSet headline="Test af titel" 
                            description={event.description}></HeadlineDescriptionSet>
                        <Limits ageLimitLower={event.minAge} ageLimitHigher={event.maxAge} deadline={event.registrationDeadline} participantLimit={event.maxUsers} numberOfParticipants={event.numberOfUsers}></Limits>
                        
                        <Link to={`/activity/edit/${id}`}>
                            <BigButton text="Rediger Opslag"></BigButton>             
                        </Link>
                        
                        
                        <BigButton text="Slet Opslag" onPress={joinEvent}></BigButton> 
                                                                        
                    </div>
                )
            }

    }
    else
    { 
        return(
            <div className="details-container">
                <ImageContainer/>
    
                <div className="profile-title-flex">
                    <TitleText title={event.title} className="title-text"/>
                    {/* <ProfilePictureName name={event.createdBy.firstName}></ProfilePictureName> */}
                </div>            
    
                <ParameterSet activityParam={event.activity} cityParam={event.city} zipCodeParam={event.zipCode} dateParam={event.date}></ParameterSet>            
                <HeadlineDescriptionSet headline="Test af titel" 
                    description={event.description}></HeadlineDescriptionSet>
                <Limits ageLimitLower={event.minAge} ageLimitHigher={event.maxAge} deadline={event.registrationDeadline} participantLimit={event.maxUsers} numberOfParticipants={event.numberOfUsers}></Limits>
    
                <BigButton text="Tilmeld!" onPress={joinEvent}></BigButton> 
                
            </div>
        )
    }
    
}

export default ActivityDetails;
