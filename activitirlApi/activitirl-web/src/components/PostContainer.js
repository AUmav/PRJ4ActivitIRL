import ActivityPost from "./ActivityPost"
import InfoElement from "./InfoElement"

const PostContainer = () => {
    return(
        <div className="info-element">
            <div className="info-element-child"><ActivityPost/></div>
            <div className="info-element-child"><ActivityPost/></div>
        </div>
    )
}

export default PostContainer