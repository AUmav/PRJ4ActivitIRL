import ActivityDetails from './ActivityDetails';
import ImageContainer from './ImageContainer'

const ActivityPost = ({data}) => {
    return (
        <div className="activity-post">
            <ImageContainer/>
            <ActivityDetails data = {data}/>
        </div>
    )   
}
export default ActivityPost;