// skal evt ændres til større container ? 

const ActivityDetails = (data) => {
    console.log("activity", data)
    return (
        <div className="activity-details">
            <h2>Title {data.data.data.strDrink}</h2> 
            <p>Aktivitet</p>
            <p>Lokation</p>
            <p>Dato</p>
        </div>
    )
}

export default ActivityDetails