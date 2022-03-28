import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";

const NavBar = () => {
    return(
        <div className="navigation-bar">
            <Link to="/"><h1>ActivityIRL</h1></Link>
            <div className="nav">
                <li>
                    <Link to="/faq">FAQ</Link>
                </li>
                <li>
                    <Link to="/join">Opret bruger</Link>
                </li>
                <li>
                    <Link to="/login">Log ind</Link>
                </li>
            </div>
            
        </div>
        
    );
}

const FAQ = () => {
    return <h2>FAQ</h2>
}
export default NavBar