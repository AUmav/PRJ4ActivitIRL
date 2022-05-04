import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import SubmitButton from '../../../00-atoms/buttons/SubmitButton';
import TitleText from '../../../00-atoms/text/TitleText';
import '../style.css'
import LabelInputSet from '../../../01-molecules/forms/LabelInputSet';
import SmallErrorText from '../../../00-atoms/text/SmallErrorText';
import LabelInputTextAreaSet from '../../../01-molecules/forms/LabelInputTextAreaSet';
import LabelInputSetShort from '../../../01-molecules/forms/LabelInputSetShort';

// https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
const AlterActivityForm = () => {
    let token = localStorage.getItem("loginToken");

    const {id} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [event, setEvent] = useState([]);
    const [userEmail, setUserEmail] = useState(null);

    const [activity, setActivity] = useState("");
    const [title, setTitle] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [registrationDeadline, setRegistrationDeadline] = useState("");
    const [ageRangeLower, setAgeRangeLower] = useState("");
    const [ageRangeUpper, setAgeRangeUpper] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const [dataValid, setDataValid] = useState(false);


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

                // Parsing the dateTime strings
                // For now using the date from the result object -> it loads faster, preventing errors

                /* result.date = dateFormat(result.date);
                result.registrationDeadline = dateFormat(result.registrationDeadline); */
                setUserEmail(result.createdBy.emailAddress);
                setActivity(result.activity);
                setTitle(result.title);
                setZipCode(result.zipCode);
                setCity(result.city);
                setStreet(result.streetName); //change when using the correct endpoint
                setStreetNumber(result.apartmentNumber); // again change
                setEventDate(result.date);
                setRegistrationDeadline(result.registrationDeadline);
                setDescription(result.description);

                //setEvent(result);
                console.log(result);      

            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.log("error")
            }
        )
    }, [])

    const handleActivityChange = (event) => {
        setActivity(event.target.value);
    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
    }
    const handleCityChange = (event) => {
        setCity(event.target.value);
    }
    const handleStreetChange = (event) => {
        setStreet(event.target.value);
    }
    const handleStreetNumberChange = (event) => {
        setStreetNumber(event.target.value);
    }
    const handleEventDateChange = (event) => {
        setEventDate(event.target.value);
    }
    const handleRegistrationDeadline = (event) => {
        setRegistrationDeadline(event.target.value);
    }
    const handleAgeRangeLowerChange = (event) => {
        setAgeRangeLower(event.target.value);
    }
    const handleAgeRangeUpperChange = (event) => {
        setAgeRangeUpper(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    
    const checkDataValid = () => {
        if ((zipCode.length === 4) && title && activity && city && street && streetNumber && eventDate && description){
            setDataValid(true);
        }
        else {
            setDataValid(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Entered function to PUT");

        checkDataValid();
        if(dataValid){
            //let url = "https://prj4-api.azurewebsites.net/api/event"
            let event = {
                "activity" : activity,
                "title" : title,
                "zipCode": zipCode,
                "city" : city,
                "streetName" : street,
                "apartmentNumber" : streetNumber,
                "date" : eventDate,
                /* "registrationDeadline" : registrationDeadline === "" ? null : registrationDeadline, */
                "description" : description,
                /* "minAge" : ageRangeLower === "" ? null : ageRangeLower,
                "maxAge" : ageRangeUpper === "" ? null : ageRangeUpper, */
                "country" : "Danmark"

            }
            
            console.log(event);

            // Skal laves om til en PUT
            fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(event),
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
                        return response.json();
                    }
                })
                .then(
                    (result) => {
                        setSubmitted(true);
                        console.log("result", result);

                        if(result !== undefined){
                            
                        }
                    },
                    (error) => {
                        setSubmitted(true);
                        alert("Error: " + error)
                    }
                )
        }
        else {
            setSubmitted(true);
        }
    }

    if(token){
        
        let payload = jwtDecode(token);
        let email = payload["email"];
        
        if(email == userEmail)
        { return (
            <div className='activityForm'>
                <TitleText title="Rediger opslag"/>

                <form onSubmit={handleSubmit}>
                    <LabelInputSet labelText="Titel*" name="title" type="text" value={title} placeholderText="Titel" onChange={handleTitleChange}/>
                    {submitted && !title && <SmallErrorText text="Indtast venligst en titel på dit opslag"/>}


                    <LabelInputSet labelText="Aktivitet*" name="activity" type="text" value={activity} placeholderText="Aktivitet" onChange={handleActivityChange}/>
                    {submitted && !activity && <SmallErrorText text="Indtast venligst en aktivitet"/>}

                    <div>
                        <LabelInputSetShort labelText="Post nr.*" name="zipCode" type="number" value={zipCode} placeholderText="8000" onChange={handleZipCodeChange}/>
                        {submitted && !(zipCode.length === 4) && <SmallErrorText text="Indtast venligst et postnummer (4 cifre)"/>}
                        <LabelInputSet labelText="By*" name="City" type="text" value={city} placeholderText="Aarhus C" onChange={handleCityChange}/>
                        {submitted && !city && <SmallErrorText text="Indtast venligst en by"/>}
                    </div>

                    <LabelInputSet labelText="Vejnavn*" name="street" type="text" value={street} placeholderText="Adresse" onChange={handleStreetChange}/>
                    {submitted && !street && <SmallErrorText text="Indtast venligst et vejnavn"/>}

                    <LabelInputSetShort labelText="Vejnr.*" name="streetNumber" type="text" value={streetNumber} placeholderText="2" onChange={handleStreetNumberChange}/>
                    {submitted && !streetNumber && <SmallErrorText text="Indtast venligst et vej nr."/>}

                    <LabelInputSet labelText="Dato*" name="eventDate" type="datetime-local" value={eventDate} placeholderText="YYYY-MM-DD" onChange={handleEventDateChange}/>
                    {submitted && !eventDate && <SmallErrorText text="Indtast venligst en dato"/>}

                    <LabelInputTextAreaSet labelText="Beskrivelse*" rows="15" name="description" value={description} placeholderText="Beskrivelse" onChange={handleDescriptionChange}/>
                    {submitted && !description && <SmallErrorText text="Indtast venligst en beskrivelse"/>}

                    {/* <LabelInputSet labelText="Sidste frist (tilmelding)" name="registrationDeadline" type="datetime-local" value={registrationDeadline} placeholderText="YYYY-MM-DD" onChange={handleRegistrationDeadline}/>

                    <LabelInputSetShort labelText="Aldersgrænse (Nedre)" name="ageRangeLower" type="number" value={ageRangeLower} placeholderText="18" onChange={handleAgeRangeLowerChange}/>
                    <LabelInputSetShort labelText="Aldersgrænse (Øvre)" name="ageRangeUpper" type="number" value={ageRangeUpper} placeholderText="18" onChange={handleAgeRangeUpperChange}/> */}


                    <div className='alignRight'>
                        <SubmitButton text="Rediger opslag"/>
                    </div>
                </form>

            </div>
        )}
        else{
            return (
                <div>
                    <h1>Du har ikke oprettet denne aktivitet!</h1>
                </div>
            )
        }
    }
    else{
        return (
            <div>
                <h1>Log ind først</h1>
            </div>
        )
    }
}


export default AlterActivityForm;