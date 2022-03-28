import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";

const NavBar = () => {
    return(
        <div className="navigation-bar">
            <div className="nav-left">
                <Link to="/"><h1>ActivityIRL</h1></Link>
            </div>
            <div className="nav-right">         
                <Link to="/faq">FAQ</Link>
                <Link to="/join">Opret bruger</Link>
                <Link to="/login">Log ind</Link>
            </div>
        </div>
        
    );
}

const FAQ = () => {
    return <h2>FAQ</h2>
}
export default NavBar