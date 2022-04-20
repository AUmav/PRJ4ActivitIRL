import BigButton from "../../00-atoms/buttons/BigButton"
import TitleText from "../../00-atoms/text/TitleText"
import './style.css'

const InfoElement = () => {
    const buttonPress = () => {
        window.location.replace("/login");
    }

    return(
        <div className="info-element">
            <div className="info-element-child">
                <div className="leftAlign">
                <TitleText title="Generel info"/>
                <p>Something something wow</p>
                </div>
            </div>
            <div className="info-element-child">
                <BigButton text='Log ind' onPress={buttonPress}/>
            </div>
        </div>
    )
}

export default InfoElement