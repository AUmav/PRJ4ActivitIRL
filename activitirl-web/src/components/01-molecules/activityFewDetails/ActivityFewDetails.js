import TitleText from "../../00-atoms/text/TitleText"

const ActivityFewDetails = ({data}) => {
    console.log("activity", data)
    return (
        <div className="activity-details">
           <TitleText title={data.strDrink}/>
            <p>Aktivitet</p>
            <p>Lokation</p>
            <p>Dato</p>
        </div>
    )
}

export default ActivityFewDetails