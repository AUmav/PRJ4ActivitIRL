import jwtDecode from "jwt-decode"
import { useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom"
import ProfilePictureName from "../../01-molecules/Profile/ProfilePictureName";
import ProfilePictureNameNavigation from "../../01-molecules/Profile/ProfilePictureNameNavigation";
import "./style.css"


// Skal nok laves om til atomer osv 

// https://andela.com/insights/react-js-tutorial-on-creating-a-custom-select-dropdown/
const UserNavigation = ({name}) => {
    const [isOpen, setIsOpen] = useState(false);

    const menu = useRef(null);
    
    let token = localStorage.getItem("loginToken")
    let payload = jwtDecode(token);
    let email = payload["email"]; // get email from payload

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    
    const closeOpenMenu = (event) => {
        if(menu.current && isOpen && !menu.current.contains(event.target)){
            setIsOpen(false);
        }
    }

    let url = "https://prj4-api.azurewebsites.net/api/user"
    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            console.log("clicked smth");
            closeOpenMenu(event);
        });

        return () => {
            document.removeEventListener('mousedown', (event) => {
                console.log("removed click event listener");
                closeOpenMenu(event);
            });
          };
    }, []);
    

    // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

    return(
        <div ref={menu}>
            <div className="userHeader" onClick={toggleMenu}>
                <ProfilePictureNameNavigation name={name}/>
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