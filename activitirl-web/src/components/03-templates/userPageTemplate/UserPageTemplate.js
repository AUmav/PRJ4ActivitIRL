import UserPageDetails from "../../02-organisms/userPage/UserPageDetails";
import UserPageNavigation from "../../02-organisms/userPage/UserPageNavigation";
import "./style.css"

const UserPageTemplate = (page) => {
    return (
        <div className="userPage">
            <table>
                <td>
                    <tr><UserPageNavigation/></tr>
                    <tr><UserPageDetails/></tr>
                </td>
            </table>
        </div>
    )
}

export default UserPageTemplate;