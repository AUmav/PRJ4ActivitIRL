import { useState } from 'react';
import SubmitButton from '../../../00-atoms/buttons/SubmitButton';
import SmallText from '../../../00-atoms/text/SmallText';
import TitleText from '../../../00-atoms/text/TitleText';
import {Link} from "react-router-dom";
import '../style.css'
import LabelInputSet from '../../../01-molecules/forms/LabelInputSet';


// https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
// 
const CreateUserForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleBirthdayChange = (event) => {
        setBirthday(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log(email);
    }
    
    const handlePwChange1 = (event) => {
        setPassword1(event.target.value);
    }
    
    const handlePwChange2 = (event) => {
        setPassword2(event.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password1 !== password2) {
            alert("Passwords don't match");
        }

        else {

        // SKIFT URL
        let url = "https://prj4-api.azurewebsites.net/api/register"
        let user = {
            "emailAddress" : email,
            "password": password1,
            "firstName" : firstName,
            "lastName" : lastName,
            "dateOfBirth" : birthday,
            
        }

        console.log(user);
        fetch(url, {
                method: "POST",
                body: JSON.stringify(user),
                headers: new Headers({
                    "Content-Type": "application/json"
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
                        console.log("user creation succesful");
                        alert("User succesfully created");

                    }
                },
                (error) => {
                    alert("Error: " + error)
                }
            )
        }
    }

    return (
        <div className='loginForm'>
            <TitleText title="Opret bruger"/>

            <form onSubmit={handleSubmit}>
                <LabelInputSet labelText="Fornavn" name="firstName" type="text" value={firstName} placeholderText="Fornavn" onChange={handleFirstNameChange}/>
                <LabelInputSet labelText="Efternavn" name="lastName" type="text" value={lastName} placeholderText="Efternavn" onChange={handleLastNameChange}/>
                <LabelInputSet labelText="E-mail" name="e-mail" type="text" value={email} placeholderText="E-mail" onChange={handleEmailChange}/>
                <LabelInputSet labelText="Fødselsdag" name="birthday" type="date" value={birthday} placeholderText="YYYY-MM-DD" onChange={handleBirthdayChange}/>
                <LabelInputSet labelText="Password" name="password1" type="password" value={password1} placeholderText="Password" onChange={handlePwChange1}/>
                <LabelInputSet labelText="" name="password2" type="password" value={password2} placeholderText="Gentag password" onChange={handlePwChange2}/>

                <div className='alignRight'>
                    <SubmitButton text="Opret"/>
                </div>
            </form>

            <hr/>
            
            <div className='redirectText'>
                <SmallText text="Har du allerede en bruger?"/>&nbsp;
                <Link to="/login"><SmallText text={"Log ind her"}/></Link>
            </div>
        </div>

    )
}


export default CreateUserForm;