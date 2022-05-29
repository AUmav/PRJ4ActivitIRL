import TitleText from "../../00-atoms/text/TitleText"

const ActivityFewDetails = ({data}) => {
     
    //console.log(data);
    

    function dateFormat(date)
    {
        let dateTime = new Date(date);
        let tempDate = dateTime.getDate();
        let tempMonth = dateTime.getMonth();
        let tempYear = dateTime.getFullYear();
        let tempHours = dateTime.getHours();
        let tempMinutes = dateTime.getMinutes();

        // The getMonth function starts at zero, and so to get the correct month must be incremented
        // The function does not add a zero before the number.. this is also manually added
        tempMonth++;
        if(tempMonth<10)
        {
            tempMonth = "0"+tempMonth;        }


        let formattedDateTime = tempDate + "-" + tempMonth + "-" + tempYear + " kl. " + tempHours + ":" + tempMinutes;
        //console.log(formattedDateTime);
        return formattedDateTime;
    }

    let dateTime = dateFormat(data.date);
    /* console.log(data); */


    return (
        <div className="activity-details">
           <TitleText title={data.title}/>
            <p>{data.activity}</p>
            <p>{data.zipCode} {data.city}</p>
            <p>{dateTime}</p>
        </div>
    )
}

export default ActivityFewDetails