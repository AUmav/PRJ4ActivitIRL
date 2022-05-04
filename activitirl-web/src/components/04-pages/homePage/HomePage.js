import PostContainer from "../../03-templates/postContainer/PostContainer"
import InfoElement from "../../02-organisms/infoElement/InfoElement"
import CheckToken from "../../../CheckToken"

const HomePage = () => {
    let token = localStorage.getItem("loginToken")
    return(
        <div>
            <CheckToken/>
            {token == null && <InfoElement/>}
            <PostContainer/>
        </div>
    )
}

export default HomePage;