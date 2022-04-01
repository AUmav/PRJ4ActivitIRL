import { useState, useEffect } from "react";
import ActivityPost from "./ActivityPost"
import InfoElement from "./InfoElement"

// https://reactjs.org/docs/faq-ajax.html
const PostContainer = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
    let url2 = "https://localhost:44392/api/event"
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
                setItems(result.drinks);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.log("error")

            }
        )
    }, [])
    console.log(items);

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded){
        return <div>Loading...</div>
    } else {
        return(
            <div className="post-container">
                {items.map((item) => (
                    <ActivityPost data = {item}/>
                ))}
            </div>
        );
    }

}


const fetchActivities = async () => {
    let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
    try {
        let response = await fetch(url)
        let activities = await response.json();
        return activities;
    }
    catch (error) {
        console.log(error);
    }
}




export default PostContainer