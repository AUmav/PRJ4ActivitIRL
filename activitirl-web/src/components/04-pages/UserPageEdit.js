import CheckToken from "../../CheckToken";
import UserPageEditDetails from "../02-organisms/userPage/UserPageEditDetails";
import UserPageTemplate from "../03-templates/userPageTemplate/UserPageTemplate";

const UserPageEdit = () => {
    return (
        <div>
            <CheckToken/>
            <UserPageTemplate page={<UserPageEditDetails/>}/>
        </div>
    )
}

export default UserPageEdit;