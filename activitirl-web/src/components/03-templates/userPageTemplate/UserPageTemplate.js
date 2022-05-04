import CheckToken from "../../../CheckToken";
import UserPageDetails from "../../02-organisms/userPage/UserPageDetails";
import UserPageNavigation from "../../02-organisms/userPage/UserPageNavigation";
import "./style.css"

const UserPageTemplate = ({page}) => {
 
    let token = localStorage.getItem("loginToken");

    return (
        <div>
            {token && <div className="centeringDiv">
                <div className="userPage">
                    <UserPageNavigation/>
                    {page}
                    </div>
            </div>}

            {!token &&
                <h1>Du skal være logget ind for at se denne side</h1>
            }
        </div>
    )
}

export default UserPageTemplate;