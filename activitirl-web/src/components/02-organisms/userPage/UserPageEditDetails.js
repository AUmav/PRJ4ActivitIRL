import userEvent from "@testing-library/user-event";
import jwtDecode from "jwt-decode"
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import Button from "../../00-atoms/buttons/Button";
import SubmitButton from "../../00-atoms/buttons/SubmitButton";
import SmallErrorText from "../../00-atoms/text/SmallErrorText";
import TitleText from "../../00-atoms/text/TitleText";
import LabelInputSet from "../../01-molecules/forms/LabelInputSet";
import LabelInputSetShort from "../../01-molecules/forms/LabelInputSetShort";
import LabelTextPair from "../../01-molecules/textPair/LabelTextPair";
import "./style.css"


// Skal nok laves om til atomer osv 

const UserPageEditDetails = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [birthday, setBirthday] = useState("");
    const [submitted, setSubmitted] = useState(false);
    
    let token = localStorage.getItem("loginToken")

    let url = "https://prj4-api.azurewebsites.net/api/user"
    useEffect(() => {
        console.log("effect")
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
                setUser(result);
                setFirstName(result.firstName);
                setLastName(result.lastName);
                setStreet(result.streetName);
                setStreetNumber(result.apartmentNumber);
                setCity(result.city);
                setZipCode(result.zipCode);
                setBirthday(result.dateOfBirth.split(" ")[0]); 
                setEmail(result.emailAddress)   
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.log("error")
            }
        )
    }, [])

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
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

    
    const handleSubmit = (e) => {
        e.preventDefault();
        // SKIFT URL
        let url = "https://prj4-api.azurewebsites.net/api/user"
        let user = {
            "firstName" : firstName,
            "lastName" : lastName,
            "zipCode": zipCode,
            "city" : city,
            "streetName" : street,
            "apartmentNumber" : streetNumber,
                   
        }

        console.log(user);
        fetch(url, {
                method: "PUT",
                body: JSON.stringify(user),
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token,

                })
            })
            .then(response => {
                if(!response.ok){
                    alert("Couldn't create user");
                }
                else{
                    return response;
                }
            })
            .then(
                (result) => {
                    console.log("result", result);

                    if(result !== undefined){
                        console.log("user edit succesful");
                        window.location.replace("/mypage")
                    }
                },
                (error) => {
                    alert("Error: " + error)
                }
            )
    }



    const cancel = () => {
        window.location.replace("/mypage");
    }

    if (error) {
        return(                
            <div className="userDetails">
                <TitleText title="Mine oplysninger"/>
                <p>Error: {error.message}</p>
            </div>
        );
    } else if (!isLoaded){
        return (                
            <div className="userDetails">
                <TitleText title="Mine oplysninger"/>
                <p>Loading...</p>
            </div>
        );
    } else {
        return(
            <div className="userDetails">
            <TitleText title="Rediger mine oplysninger"/>

            <form onSubmit={handleSubmit}>
                <LabelInputSet labelText="Fornavn" name="firstName" type="text" value={firstName} placeholderText="Fornavn" onChange={handleFirstNameChange}/>
                <LabelInputSet labelText="Efternavn" name="lastName" type="text" value={lastName} placeholderText="Efternavn" onChange={handleLastNameChange}/>
                <LabelTextPair labelText="Fødselsdag" text={birthday}/>
                <LabelTextPair labelText="Email" text={email}/>

                <hr/>
                <p>Adresse</p>
                <LabelInputSet labelText="Vejnavn" name="street" type="text" value={street} placeholderText="Adresse" onChange={handleStreetChange}/>
                    {submitted && !street && <SmallErrorText text="Indtast venligst et vejnavn"/>}

                    <LabelInputSetShort labelText="Vejnr." name="streetNumber" type="text" value={streetNumber} placeholderText="2" onChange={handleStreetNumberChange}/>
                    {submitted && !streetNumber && <SmallErrorText text="Indtast venligst et vej nr."/>}
                    <div>
                        <LabelInputSetShort labelText="Post nr." name="zipCode" type="number" value={zipCode} placeholderText="8000" onChange={handleZipCodeChange}/>
                        {submitted && !(zipCode.length === 4) && <SmallErrorText text="Indtast venligst et postnummer (4 cifre)"/>}
                        <LabelInputSet labelText="By" name="City" type="text" value={city} placeholderText="Aarhus C" onChange={handleCityChange}/>
                        {submitted && !city && <SmallErrorText text="Indtast venligst en by"/>}
                    </div>
                <div className='alignRight'>
                    <SubmitButton text="Bekræft"/>
                </div>
            </form>
            <Button text="Tilbage" onPress={cancel}/>

            </div>
        );
    }
}

export default UserPageEditDetails;