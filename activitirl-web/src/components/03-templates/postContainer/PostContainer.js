import { useState, useEffect } from "react";
import ActivityPost from "../../02-organisms/activityPost/ActivityPost";
import {Link} from "react-router-dom"
import './style.css'

// https://reactjs.org/docs/faq-ajax.html
const PostContainer = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    let url = "https://prj4-api.azurewebsites.net/api/event"
    useEffect(() => {
        console.log("effect")
        fetch(url, {
            method: 'GET',
            //credentials: 'include',

        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                console.log("loaded")
                console.log(url);
                //console.log(result);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.log("error")
            }
        )
    }, [])
    /* console.log(items); */

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded){
        return <div>Loading...</div>
    } else {
        return(
            <div className="post-container">   
                    {items.map((item) => (
                        <Link key={item.id} to={`/activity/${item.eventId}`}>
                            <ActivityPost data = {item}/>
                        </Link>
                    ))}
               
            </div>
        );
    }

}


export default PostContainer;