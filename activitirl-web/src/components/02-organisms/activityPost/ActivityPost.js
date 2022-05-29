import ActivityDetails from '../../01-molecules/activityFewDetails/ActivityFewDetails';
import ImageContainer from '../../00-atoms/images/ImageContainer'
import './style.css'

const ActivityPost = ({data}) => {
    //console.log(data)
    return (
        <div className="activity-post">
            <ImageContainer/>
            <ActivityDetails data = {data}/>
        </div>
    )   
}
export default ActivityPost;