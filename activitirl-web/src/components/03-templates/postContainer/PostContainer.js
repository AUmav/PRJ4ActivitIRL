import { useState, useEffect } from "react";
import ActivityPost from "../../02-organisms/activityPost/ActivityPost";
import {Link} from "react-router-dom"
import './style.css'

// https://reactjs.org/docs/faq-ajax.html
const PostContainer = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mar"
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
                        <Link to={`/activity/${item.idDrink}`}>
                            <ActivityPost data = {item}/>
                        </Link>
                    ))}
               
            </div>
        );
    }

}


export default PostContainer;