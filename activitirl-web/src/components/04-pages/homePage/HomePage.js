import PostContainer from "../../03-templates/postContainer/PostContainer"
import InfoElement from "../../02-organisms/infoElement/InfoElement"

const HomePage = () => {
    let token = localStorage.getItem("loginToken")
    return(
        <div>
            {token == null && <InfoElement/>}
            <PostContainer/>
        </div>
    )
}

export default HomePage;