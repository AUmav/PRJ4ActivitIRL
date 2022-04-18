import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserNavigation from "./02-organisms/userNavigation/UserNavigation";

const NavBar = () => {
    let token = localStorage.getItem("loginToken")

    console.log("hej", token);

    return(
        <div className="navigation-bar">
            <Link to="/"><h1>ActivitIRL</h1></Link>
            
            {/* If not logged in*/}
            {!token && 
                <div className="nav">
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
                </div>
            }

            {/* If logged in*/}
            {token && 
                <div className="nav">
                    <ul>
                        <li>
                            <Link to="/faq">FAQ</Link>
                        </li>
                        <li>
                            <Link to="/create">Opret opslag</Link>
                        </li>
                        <li>
                            <Link to="/logout">Log ud</Link>
                        </li>
                        <li>
                            <UserNavigation/>
                        </li>
                    </ul>
                </div>
            }


        </div>
    )
}

export default NavBar