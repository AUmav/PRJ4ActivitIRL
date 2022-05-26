import userEvent from "@testing-library/user-event";
import jwtDecode from "jwt-decode"
import { useState, useEffect } from "react";
import {Link, useSearchParams} from "react-router-dom"
import Button from "../../00-atoms/buttons/Button";
import TitleText from "../../00-atoms/text/TitleText";
import LabelTextPair from "../../01-molecules/textPair/LabelTextPair";
import "./style.css"


// Skal nok laves om til atomer osv 

const UserPageDetails = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [birthday, setBirthday] = useState(null);

    const [user, setUser] = useState([]);
    
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
                setBirthday(result.dateOfBirth.split(" ")[0]);

            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.log("error")
            }
        )
    }, [])

    const edit = () => {
        window.location.replace("/mypage/edit");
    }

    if (error) {
        return(                
            <div className="userDetails">
                <TitleText title="Mine oplysninger"/>
                <p>Error: {error.message}</p>
            </div>
        )
    } else if (!isLoaded){
        return (                
            <div className="userDetails">
                <TitleText title="Mine oplysninger"/>
                <p>Loading...</p>
            </div>
        )
    } else {
        return(
            <div className="userDetails">
                <TitleText title="Mine oplysninger"/>
                <LabelTextPair labelText="Fornavn" text={user.firstName}/>
                <LabelTextPair labelText="Efternavn" text={user.lastName}/>
                <LabelTextPair labelText="Fødseldag" text={birthday}/>
                <LabelTextPair labelText="Email" text={user.emailAddress}/>
                <hr/>
                <p>Adresse</p>
                {user.streetName === "" &&<LabelTextPair labelText="By"small={user.streetName === "" ? "true" : "false"} smallText="Ikke udfyldt"/>}

                {user.streetName !== "" && <LabelTextPair labelText="Vejnavn" text={user.streetName}/>}

                {user.apartmentNumber !== "" && <LabelTextPair labelText="Vejnr." text={user.apartmentNumber} />}
                {user.apartmentNumber === "" && <LabelTextPair labelText="Vejnr." small={user.apartmentNumber === "" ? "true" : "false"} smallText="Ikke udfyldt"/>}                

                {user.zipCode !== "" && <LabelTextPair labelText="Postnr." text={user.zipCode}/>}
                {user.zipCode === "" && <LabelTextPair labelText="Postnr."  small={user.zipCode === "" ? "true" : "false"} smallText="Ikke udfyldt"/>}

                {user.streetName !== "" &&<LabelTextPair labelText="By" text={user.city} />}
                {user.streetName === "" && <LabelTextPair labelText="Vejnavn" small={user.streetName === "" ? "true" : "false"} smallText="Ikke udfyldt"/>}


                       
                <div className="alignRight">
                    <Button text="Rediger" onPress={edit}/>
                </div>
            </div>
        );
    }
}

export default UserPageDetails;