import UserPageDetails from "../../02-organisms/userPage/UserPageDetails";
import UserPageNavigation from "../../02-organisms/userPage/UserPageNavigation";
import "./style.css"

const UserPageTemplate = ({page}) => {
 
    return (
        <div className="centeringDiv">
        <div className="userPage">
                <UserPageNavigation/>
                {page}
                </div>
        </div>
    )
}

export default UserPageTemplate;