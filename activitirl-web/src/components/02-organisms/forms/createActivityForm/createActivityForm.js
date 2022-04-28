import { useState } from 'react';
import SubmitButton from '../../../00-atoms/buttons/SubmitButton';
import TitleText from '../../../00-atoms/text/TitleText';
import '../style.css'
import LabelInputSet from '../../../01-molecules/forms/LabelInputSet';
import SmallErrorText from '../../../00-atoms/text/SmallErrorText';
import LabelInputTextAreaSet from '../../../01-molecules/forms/LabelInputTextAreaSet';
import LabelInputSetShort from '../../../01-molecules/forms/LabelInputSetShort';

// https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
const CreateActivityForm = () => {
    let token = localStorage.getItem("loginToken");

    const [activity, setActivity] = useState("");
    const [title, setTitle] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [lastDate, setLastDate] = useState("");
    const [ageRangeLower, setAgeRangeLower] = useState("");
    const [ageRangeUpper, setAgeRangeUpper] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);

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
    const handleLastDateChange = (event) => {
        setLastDate(event.target.value);
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
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // SKIFT URL
        let url = "https://prj4-api.azurewebsites.net/api/event"
        let event = {
            "activity" : activity,
            "title" : title,
            "zipCode": zipCode,
            "city" : city,
            "streetName" : street,
            "apartmentNumber" : streetNumber,
            "date" : eventDate,
            "registrationDeadline" : lastDate,
            "description" : description,
            "minAge" : ageRangeLower === "" ? null : ageRangeLower,
            "maxAge" : ageRangeUpper === "" ? null : ageRangeUpper,
            "country" : "Danmark"
        }
        

        console.log(event);

        fetch(url, {
                method: "POST",
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

    if(token){
        return (
            <div className='activityForm'>
                <TitleText title="Opret opslag"/>

                <form onSubmit={handleSubmit}>
                    <LabelInputSet labelText="Titel*" name="title" type="text" value={title} placeholderText="Titel" onChange={handleTitleChange}/>
                    {submitted && !title && <SmallErrorText text="Indtast venligst en titel på dit opslag"/>}


                    <LabelInputSet labelText="Aktivitet*" name="activity" type="text" value={activity} placeholderText="Aktivitet" onChange={handleActivityChange}/>
                    {submitted && !activity && <SmallErrorText text="Indtast venligst en aktivitet"/>}

                    <div>
                        <LabelInputSetShort labelText="Post nr.*" name="zipCode" type="text" value={zipCode} placeholderText="8000" onChange={handleZipCodeChange}/>
                        {submitted && !zipCode && <SmallErrorText text="Indtast venligst et postnummer"/>}
                        <LabelInputSet labelText="By*" name="City" type="text" value={city} placeholderText="Aarhus C" onChange={handleCityChange}/>
                        {submitted && !city && <SmallErrorText text="Indtast venligst en by"/>}
                    </div>

                    <LabelInputSet labelText="Vejnavn*" name="street" type="text" value={street} placeholderText="Adresse" onChange={handleStreetChange}/>
                    {submitted && !street && <SmallErrorText text="Indtast venligst et vejnavn"/>}

                    <LabelInputSet labelText="Vejnr.*" name="streetNumber" type="text" value={streetNumber} placeholderText="2" onChange={handleStreetNumberChange}/>
                    {submitted && !streetNumber && <SmallErrorText text="Indtast venligst et vej nr."/>}

                    <LabelInputSet labelText="Dato*" name="eventDate" type="datetime-local" value={eventDate} placeholderText="YYYY-MM-DD" onChange={handleEventDateChange}/>
                    {submitted && !eventDate && <SmallErrorText text="Indtast venligst en dato"/>}

                    <LabelInputTextAreaSet labelText="Beskrivelse*" name="description" value={description} placeholderText="Beskrivelse" onChange={handleDescriptionChange}/>
                    {submitted && !description && <SmallErrorText text="Indtast venligst en beskrivelse"/>}

                    <LabelInputSet labelText="Sidste frist (tilmelding)" name="lastDate" type="datetime-local" value={lastDate} placeholderText="YYYY-MM-DD" onChange={handleLastDateChange}/>

                    <LabelInputSetShort labelText="Aldersgrænse (Nedre)" name="ageRangeLower" type="number" value={ageRangeLower} placeholderText="18" onChange={handleAgeRangeLowerChange}/>
                    <LabelInputSetShort labelText="Aldersgrænse (Øvre)" name="ageRangeUpper" type="number" value={ageRangeUpper} placeholderText="18" onChange={handleAgeRangeUpperChange}/>


                    <div className='alignRight'>
                        <SubmitButton text="Opret opslag"/>
                    </div>
                </form>

            </div>
        )
    }
    else{
        return (
            <div>
                <h1>Log ind først!</h1>
            </div>
        )
    }
}


export default CreateActivityForm;