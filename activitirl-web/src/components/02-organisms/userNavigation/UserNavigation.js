import jwtDecode from "jwt-decode"
import { useState } from "react";
import {Link} from "react-router-dom"
import ProfilePictureName from "../../01-molecules/Profile/ProfilePictureName";
import "./style.css"


// Skal nok laves om til atomer osv 

// https://andela.com/insights/react-js-tutorial-on-creating-a-custom-select-dropdown/
const UserNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    let token = localStorage.getItem("loginToken")
    let payload = jwtDecode(token);
    let email = payload["email"]; // get email from payload

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return(
        <div>
            <div className="userHeader" onClick={toggleMenu}>
                {email}
            </div>
            {isOpen && 
                <div className="dropDown" onClick={toggleMenu}>
                    <Link to="/mypage">
                        <div className="dropDownItem">
                            <li>Min profil</li>
                        </div>
                    </Link>
                    <Link to="/myactivities">
                        <div className="dropDownItem">
                            <li>Mine aktiviteter</li>
                        </div>
                    </Link>
                    <Link to="/logout">
                        <div className="dropDownItem">
                            <li>Log ud</li>
                        </div>
                    </Link>
                </div>
            }
        </div>
    )
}

export default UserNavigation;