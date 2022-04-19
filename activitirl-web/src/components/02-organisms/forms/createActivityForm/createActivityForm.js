import { useState } from 'react';
import SubmitButton from '../../../00-atoms/buttons/SubmitButton';
import TitleText from '../../../00-atoms/text/TitleText';
import '../style.css'
import LabelInputSet from '../../../01-molecules/forms/LabelInputSet';
import SmallErrorText from '../../../00-atoms/text/SmallErrorText';
import LabelInputTextAreaSet from '../../../01-molecules/forms/LabelInputTextAreaSet';
import jwtDecode from 'jwt-decode';

// https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
const CreateActivityForm = () => {
    let token = localStorage.getItem("loginToken");

    const [activity, setActivity] = useState("");
    const [title, setTitle] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [ageRange, setAgeRange] = useState("");
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
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handleEventDateChange = (event) => {
        setEventDate(event.target.value);
    }
    const handleAgeRangeChange = (event) => {
        setAgeRange(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // SKIFT URL
        let url = "https://localhost:44368/api/account/login"
        let event = {
            "activity" : activity,
            "title" : title,
            "zipCode": zipCode,
            "city" : city,
            "address" : address,
            "eventDate" : eventDate,
            "description" : description,
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
            <div className='loginForm'>
                <TitleText title="Opret opslag"/>

                <form onSubmit={handleSubmit}>
                    <LabelInputSet labelText="Aktivitet" name="activity" type="text" value={activity} placeholderText="Aktivitet" onChange={handleActivityChange}/>
                    {submitted && !activity && <SmallErrorText text="Indtast venligst en aktivitet"/>}

                    <div>
                        <LabelInputSet labelText="Post nr." name="zipCode" type="text" value={zipCode} placeholderText="8000" onChange={handleZipCodeChange}/>
                        {submitted && !zipCode && <SmallErrorText text="Indtast venligst et postnummer"/>}
                        <LabelInputSet labelText="By" name="City" type="text" value={city} placeholderText="Aarhus C" onChange={handleCityChange}/>
                        {submitted && !city && <SmallErrorText text="Indtast venligst en by"/>}
                    </div>

                    <LabelInputSet labelText="Adresse" name="address" type="text" value={address} placeholderText="Adresse 1" onChange={handleAddressChange}/>
                    {submitted && !address && <SmallErrorText text="Indtast venligst en addresse"/>}

                    <LabelInputSet labelText="Dato" name="eventDate" type="datetime-local" value={eventDate} placeholderText="YYYY-MM-DD" onChange={handleEventDateChange}/>
                    {submitted && !eventDate && <SmallErrorText text="Indtast venligst en dato"/>}


                    <LabelInputTextAreaSet labelText="Beskrivelse" name="description" value={description} placeholderText="Besrkivelse" cols= "40" rows="5" onChange={handleDescriptionChange}/>
                    {submitted && !description && <SmallErrorText text="Indtast venligst en beskrivelse"/>}

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