import { Link } from "react-router-dom";

const UserPageNavigation = () => {
    return (
        <div className="userPageNav">
            <ul>
                <li>
                    <Link to="/mypage">Min profil</Link>
                </li>
                <li>
                    <Link to="/myactivities">Mine aktiviteter</Link>
                </li>
                <li>
                    <Link to="/logout">Log ud</Link>
                </li>
            </ul>
        </div>
    );
}

export default UserPageNavigation;