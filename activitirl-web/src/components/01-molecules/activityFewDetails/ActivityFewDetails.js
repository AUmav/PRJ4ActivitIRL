import TitleText from "../../00-atoms/text/TitleText"

const ActivityFewDetails = ({data}) => {
    //console.log("activity", data)
    return (
        <div className="activity-details">
           <TitleText title={data.title}/>
            <p>{data.activity}</p>
            <p>{data.zipCode} {data.city}</p>
            <p>Dato</p>
        </div>
    )
}

export default ActivityFewDetails