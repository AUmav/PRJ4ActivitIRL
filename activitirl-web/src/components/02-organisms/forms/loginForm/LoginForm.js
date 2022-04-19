import { useState } from 'react';
import SubmitButton from '../../../00-atoms/buttons/SubmitButton';
import SmallText from '../../../00-atoms/text/SmallText';
import TitleText from '../../../00-atoms/text/TitleText';
import {Link} from "react-router-dom";
import '../style.css'
import LabelInputSet from '../../../01-molecules/forms/LabelInputSet';
import SmallErrorText from '../../../00-atoms/text/SmallErrorText';

// https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePwChange = (event) => {
        setPassword(event.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let url = "https://prj4-api.azurewebsites.net/api/login"
        let user = {
            "emailAddressOrAlias" : email,
            "password": password,
        }

        console.log(user);

        fetch(url, {
                method: "POST",
                body: JSON.stringify(user),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                })
            })
            .then(response => {
                if(!response.ok){
                    alert("Wrong login");
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
                        let token = result;
                        console.log("login succesful");
                        console.log(token);
                        localStorage.setItem("loginToken", token)
                        window.location.replace("/");

                    }
                },
                (error) => {
                    setSubmitted(true);
                    alert("Error: " + error)
                }
            )
    }

    return (
        <div className='loginForm'>
            <TitleText title="Login"/>

            <form onSubmit={handleSubmit}>
                <LabelInputSet labelText="E-mail" name="e-mail" type="text" value={email} placeholderText="E-mail" onChange={handleEmailChange}/>
                {submitted && !email && <SmallErrorText text="Indtast venligst din e-mail"/>}

                <LabelInputSet labelText="Password" name="password" type="password" value={password} placeholderText="Password" onChange={handlePwChange}/>
                {submitted && !password && <SmallErrorText text="Indtast venligst dit password"/>}

                <div className='alignRight'>
                    <SubmitButton text="Log ind"/>
                </div>
            </form>

            <hr/>
            
            <div className='redirectText'>
                <SmallText text="Har du ikke en bruger?"/>&nbsp;
                <Link to="/join"><SmallText text={"Opret en her"}/></Link>
            </div>

        </div>
    )
}


export default LoginForm;