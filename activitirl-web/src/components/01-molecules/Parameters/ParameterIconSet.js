import ParameterText from "../../00-atoms/text/ParameterText";
import IconContainer from "../../00-atoms/images/IconContainer";
import './style.css'

const ParameterIconSet = ({type, paramtext}) => {
    return (
        <div className="parameter-icon-container"> 
            <IconContainer iconType={type} />
            <ParameterText parameterText={paramtext}/>
        </div> 
    )    
}

export default ParameterIconSet;