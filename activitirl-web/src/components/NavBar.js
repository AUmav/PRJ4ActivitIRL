import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserNavigation from "./02-organisms/userNavigation/UserNavigation";
import BigIconContainerButton from "./00-atoms/images/BigIconContainerButton";
import ProfilePictureNameNavigation from "./01-molecules/Profile/ProfilePictureNameNavigation";


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("Dit navn");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    let token = localStorage.getItem("loginToken")

    let url = "https://prj4-api.azurewebsites.net/api/user"
    useEffect(() => {
        if(token){
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
                setName(result.firstName + " " + result.lastName.charAt(0) + ".");
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.log("error")
            }
        )}
    }, []);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    return(
        <div className="nav-wrapper">
            <div className="navigation-bar">
                    <Link to="/"><h1>ActivitIRL</h1></Link>

                    <div className="menu-button" onClick={toggleMenu}>
                        {!token && <BigIconContainerButton iconType="menu"/>}
                        {token && <ProfilePictureNameNavigation name={name}/>}
                    </div>

                    <div className="navbar-big">
                    {/* If not logged in*/}
                    {!token && 
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/faq">FAQ</Link>
                                </li>
                                <li>
                                    <Link to="/join">Opret bruger</Link>
                                </li>
                                <li>
                                    <Link to="/login">Log ind</Link>
                                </li>
                            </ul>
                        </nav>
                    }

                        
                    {/* If logged in*/}
                    {token && 
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/faq">FAQ</Link>
                                </li>
                                <li>
                                    <Link to="/activity/create">Opret opslag</Link>
                                </li>
                                <li>
                                    <UserNavigation name={name}/>
                                </li>
                            </ul>
                        </nav>
                    }
                </div>
            </div>
            <div className="navbar-small">
                {/* If not logged in*/}
                {!token && isOpen &&
                        <nav>
                            <ul>
                                <div className="smth_item">
                                    <li>
                                        <Link to="/faq">FAQ</Link>
                                    </li>
                                </div>
                                <li>
                                    <Link to="/join">Opret bruger</Link>
                                </li>
                                <li>
                                    <Link to="/login">Log ind</Link>
                                </li>
                            </ul>
                        </nav>
                    }

                        
                    {/* If logged in*/}
                    {token && isOpen &&
                        <div className="navbar-small" onClick={toggleMenu}>
                            <Link to="/mypage">
                                <div className="navbar-item">
                                    <li>Min profil</li>
                                </div>
                            </Link>
                            <Link to="/myactivities">
                                <div className="navbar-item">
                                    <li>Mine aktiviteter</li>
                                </div>
                            </Link>
                            <Link to="/activity/create">
                                <div className="navbar-item">
                                    <li>Opret opslag</li>
                                </div>
                            </Link>
                            <Link to="/FAQ">
                                <div className="navbar-item">
                                    <li>FAQ</li>
                                </div>
                            </Link>
                            <Link to="/logout">
                                <div className="navbar-item">
                                    <li>Log ud</li>
                                </div>
                            </Link>
                        </div>
                    }   
            </div>
        </div>
                   
    )
}

export default NavBar