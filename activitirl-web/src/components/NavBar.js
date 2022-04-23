import { Link } from "react-router-dom";
import UserNavigation from "./02-organisms/userNavigation/UserNavigation";

const NavBar = () => {
    let token = localStorage.getItem("loginToken")
    return(
        <div className="navigation-bar">
            <Link to="/"><h1>ActivitIRL</h1></Link>
            
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
                    <button className="hamburger">hello</button>
                    <ul>
                        <li>
                            <Link to="/faq">FAQ</Link>
                        </li>
                        <li>
                            <Link to="/activity/create">Opret opslag</Link>
                        </li>
                        <li>
                            <UserNavigation/>
                        </li>
                    </ul>
                </nav>
            }

        </div>
    )
}

export default NavBar