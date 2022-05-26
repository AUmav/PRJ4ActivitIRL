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
    const [signedUp, setSignedUp] = useState(false);   

    
    let baseMapsUrl = "https://www.google.com/maps/place/"
    

    let url = "https://prj4-api.azurewebsites.net/api/event/"
    url += id;
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            })

        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                console.log("loaded")
                console.log(result);

                // Parsing the dateTime strings
                // For now using the date from the result object -> it loads faster, preventing errors
                result.date = dateFormat(result.date);
                result.registrationDeadline = dateFormat(result.registrationDeadline);
                //result.registrationDeadline = dateFormat(result.registrationDeadline);
                
                setEvent(result);
                setUserEmail(result.createdBy.emailAddress);  

                // For some reason the value of IsSignedup is returned with capital letters, 
                // even though it is a boolean... 

                if(result.isSignedup === "True")
                {
                    setSignedUp(true);  
                }
                else
                {
                    setSignedUp(false);  
                }

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
            let urlRegister = "https://prj4-api.azurewebsites.net/api/event/"+"Register/"+id;
            fetch(urlRegister, {
                method: "PUT",
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json"
                })
            })
            .then(response => {
                if(!response.ok){
                    alert("Something went wrong");
                }
                else{
                    
                    if(signedUp === false)
                    {
                        alert("Du er nu tilmeldt denne aktivitet!");
                    }
                    else
                    {
                        alert("Du er nu afmeldt denne aktivitet!");
                    }

                    window.location.reload(false);
                    return response.json();
                    
                }
            })

            /* alert("Du er nu tilmeldt denne aktivitet!");
            console.log("User joins event."); */
        }        
    };

    const deleteEvent = () => {
        fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
                "Accept": "application/json"
            })

        })
        .then(res => res.json())
        .then(
            (result) => {
                if (result !== undefined){

                }

            },
            (error) => {
                setError(error);
                console.log("error")
            }
        )
    }

    function dateFormat(date)
    {
        let dateTime = new Date(date);
        let tempDate = dateTime.getDate();
        let tempMonth = dateTime.getMonth();
        let tempYear = dateTime.getFullYear();
        let tempHours = dateTime.getHours();
        let tempMinutes = dateTime.getMinutes();

        // The getMonth function starts at zero, and so to get the correct month must be incremented
        // The function does not add a zero before the number.. this is also manually added
        tempMonth++;
        if(tempMonth<10)
        {
            tempMonth = "0"+tempMonth;        }


        let formattedDateTime = tempDate + "-" + tempMonth + "-" + tempYear + " kl. " + tempHours + ":" + tempMinutes;
        
        return formattedDateTime;
    }

    
    if(token && (email === userEmail)) 
    {
        if(email === userEmail)
            {
                // Creating the url to google maps -> url encoding the adress + appending to base url
                // https://www.google.com/maps/place/
                
                let tempAdress = event.city + ", " + event.zipCode + " " + event.streetName + " " + event.apartmentNumber;
                let adressUrl = baseMapsUrl + encodeURIComponent(tempAdress);
    
                return(
                    <div className="details-container">
                        <ImageContainer/>
            
                        <div className="profile-title-flex">
                            <TitleText title={event.title} className="title-text"/>
                            {/* <ProfilePictureName name={event.createdBy.firstName}></ProfilePictureName> */}
                        </div>            
            
                        <ParameterSet urlParam={adressUrl} activityParam={event.activity} cityParam={event.city} zipCodeParam={event.zipCode} dateParam={event.date} adressParam={event.streetName+" "+event.apartmentNumber}></ParameterSet>            
                        <HeadlineDescriptionSet headline="Test af titel" 
                            description={event.description}></HeadlineDescriptionSet>
                        <Limits ageLimitLower={event.minAge} ageLimitHigher={event.maxAge} deadline={event.registrationDeadline} participantLimit={event.maxUsers} numberOfParticipants={event.numberOfUsers}></Limits>
                        
                        <Link to={`/activity/edit/${id}`}>
                            <BigButton text="Rediger Opslag"></BigButton>             
                        </Link>
                        
                        
                        <BigButton text="Slet Opslag" onPress={deleteEvent}></BigButton> 
                                                                        
                    </div>
                )
            }

    }
    else
    { 
        // Creating the url to google maps -> url encoding the adress + appending to base url
        // https://www.google.com/maps/place/
        
        let tempAdress = event.city + ", " + event.zipCode;
        let adressUrl = baseMapsUrl + encodeURIComponent(tempAdress);
        
        return(
            <div className="details-container">
                <ImageContainer/>
    
                <div className="profile-title-flex">
                    <TitleText title={event.title} className="title-text"/>
                    {/* <ProfilePictureName name={event.createdBy.firstName}></ProfilePictureName> */}
                </div>            

                {signedUp === true
                    ? <ParameterSet urlParam={adressUrl} activityParam={event.activity} cityParam={event.city} zipCodeParam={event.zipCode} dateParam={event.date} adressParam={event.streetName+" "+event.apartmentNumber}></ParameterSet>            
                    : <ParameterSet urlParam={adressUrl} activityParam={event.activity} cityParam={event.city} zipCodeParam={event.zipCode} dateParam={event.date}></ParameterSet>            
                }
                <HeadlineDescriptionSet headline="Test af titel" 
                    description={event.description}></HeadlineDescriptionSet>
                <Limits ageLimitLower={event.minAge} ageLimitHigher={event.maxAge} deadline={event.registrationDeadline} participantLimit={event.maxUsers} numberOfParticipants={event.numberOfUsers}></Limits>

                {signedUp === true
                    ? <BigButton text="Afmeld!" onPress={joinEvent}></BigButton> 
                    : <BigButton text="Tilmeld!" onPress={joinEvent}></BigButton> 
                }
                
                
            </div>
        )
    }
    
}

export default ActivityDetails;
