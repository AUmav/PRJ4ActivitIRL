import ImageContainer from "../../00-atoms/images/ImageContainer";
import HeadlineDescriptionSet from "../../01-molecules/Descriptions/HeadlineDescriptionSet";
import Limits from "../../01-molecules/Parameters/Limits";
import ParameterSet from "../../02-organisms/PostDetails/ParameterSet";
import ProfilePictureName from "../../01-molecules/Profile/ProfilePictureName";
import BigButton from "../../00-atoms/buttons/BigButton";
import './style.css'

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import TitleText from "../../00-atoms/text/TitleText";

// https://stackoverflow.com/questions/68828342/react-dynamic-route-for-webpage
const ActivityDetails = () => {
    const {id} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [event, setEvent] = useState([]);

    let url = "https://prj4-api.azurewebsites.net/api/event/dummyevent"
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
                setEvent(result);
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
        console.log("User joins event.");
    };

    return(
        <div className="details-container">
            {/* <p>{id}</p>
            <p>{event.title}, {event.city}, {event.zipCode}, {event.activity}</p>
            <p>hooray</p> */}

            <ImageContainer/>

            <div className="profile-title-flex">
                <TitleText title={event.title} className="title-text"/>
                <ProfilePictureName name="Jonas"></ProfilePictureName>
            </div>            

            <ParameterSet activityParam={event.activity} cityParam={event.city} zipCodeParam={event.zipCode} dateParam="28. maj, kl 10:15"></ParameterSet>            
            <HeadlineDescriptionSet headline="Test af titel" 
                description="Kom og spil fodbold! Vi er et par stykker der søger flere til at spille fodbold på 
                en stor græsplæne der tilhøre fællesarealet, tæt på min lejlighed. Det kunne være fedt at være 
                nok til to hele hold, så vi kunne spille imod hinanden."></HeadlineDescriptionSet>
            <Limits ageLimit="18+" deadline="20. maj" participantLimit="15" numberOfParticipants="2"></Limits>

            <BigButton text="Tilmeld!" onPress={joinEvent}></BigButton>
        </div>
    )
}

export default ActivityDetails;
//<ParameterIconSet type="room" text="Bymosevej 69"/>