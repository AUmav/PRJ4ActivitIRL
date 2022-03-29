import Button from "./Button"

const InfoElement = () => {
    return(
        <div className="info-element">
            <div className="info-element-child">
                <p>Generel info</p>
            </div>
            <div className="info-element-child">
                <Button text='Log ind'/>
            </div>
        </div>
    )
}

export default InfoElement