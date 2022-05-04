import CheckToken from "../../CheckToken";
import UserPageDetails from "../02-organisms/userPage/UserPageDetails";
import UserPageTemplate from "../03-templates/userPageTemplate/UserPageTemplate";

const UserPage = () => {
    return (
        <div>
            <CheckToken/>
            <UserPageTemplate page={<UserPageDetails/>}/>
        </div>
    )
}

export default UserPage;