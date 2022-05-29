import ParameterIconSet from '../../01-molecules/Parameters/ParameterIconSet';
import './style.css'

const ParameterSet = ({activityParam, cityParam, zipCodeParam, dateParam, adressParam, urlParam}) => {  
    
    return (
        <div className="parameters-container parameters-text">
            <ParameterIconSet type="event" paramtext={activityParam}></ParameterIconSet>
            {adressParam == undefined 
                ? <a href={urlParam} target="_blank"><ParameterIconSet type="room" paramtext={cityParam+", "+zipCodeParam}></ParameterIconSet></a>
                : <a href={urlParam} target="_blank"><ParameterIconSet type="room" paramtext={cityParam+", "+zipCodeParam+" - "+adressParam}></ParameterIconSet></a>
            }            
            <ParameterIconSet type="schedule" paramtext={dateParam}></ParameterIconSet>
        </div>
    )   
}
export default ParameterSet;


{/* <div className="parameters-container">
<ParameterIconSet type="event" paramtext="Fodbold"></ParameterIconSet>
<ParameterIconSet type="room" paramtext="Aarhus V, 8210"></ParameterIconSet>
<ParameterIconSet type="schedule" paramtext="28. maj, kl 10:15"></ParameterIconSet>
</div> */} 