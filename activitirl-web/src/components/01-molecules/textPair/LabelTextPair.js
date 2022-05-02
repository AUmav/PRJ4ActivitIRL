import Label from "../../00-atoms/forms/Label";
import SmallText from "../../00-atoms/text/SmallText";
import "./style.css"

const LabelTextPair = ({labelFor, labelText, text, small, smallText}) => {
    return(
        <div className="labelTextPair">
            <Label labelFor={labelFor} labelText={labelText}/>
            {!small && <p>{text}</p>}
            {small === "true" && <SmallText text={smallText}/>}
        </div>
    );
}

export default LabelTextPair;