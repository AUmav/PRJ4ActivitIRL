const NavBar = () => {
    return(
        <div className="navigation-bar">
            <div className="nav-left">
                <h1>ActivityIRL</h1>
            </div>
            <div className="nav-right">            
                <a href="/faq">FAQ</a>
                <a href="/join">Opret bruger</a>
                <a href="/login">Log ind</a>
            </div>
        </div>
        
    );

}

export default NavBar