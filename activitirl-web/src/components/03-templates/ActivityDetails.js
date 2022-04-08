import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"

// https://stackoverflow.com/questions/68828342/react-dynamic-route-for-webpage
const ActivityDetails = () => {
    const {id} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [event, setEvent] = useState([]);

    let url = "https://prj4-api.azurewebsites.net/api/event/dummyevent"
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            //credentials: 'include',

        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                console.log("loaded")
                setEvent(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.log("error")

            }
        )
    }, [])

    return(
        <div>
            <p>{id}</p>
            <p>{event.title}, {event.city}, {event.zipCode}, {event.activity}</p>
            <p>hooray</p>
        </div>
    )
}

export default ActivityDetails;