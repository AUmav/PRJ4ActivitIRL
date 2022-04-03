import { useParams } from "react-router-dom";

// https://stackoverflow.com/questions/68828342/react-dynamic-route-for-webpage
const ActivityDetails = () => {
    const {id} = useParams();
    
    return(
        <div>
            <p>{id}</p>
            <p>hooray</p>
        </div>
    )
}

export default ActivityDetails;