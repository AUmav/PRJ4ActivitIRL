import ParameterIconSet from '../../01-molecules/Parameters/ParameterIconSet';
import './style.css'

const ParameterSet = ({activityParam, cityParam, zipCodeParam, dateParam}) => {  
    
    return (
        <div className="parameters-container">
            <ParameterIconSet type="event" paramtext={activityParam}></ParameterIconSet>
            <ParameterIconSet type="room" paramtext={cityParam+", "+zipCodeParam}></ParameterIconSet>
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