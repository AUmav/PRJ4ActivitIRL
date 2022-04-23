import InputTextShort from "../../00-atoms/forms/InputTextShort";
import Label from "../../00-atoms/forms/Label";
import './style.css'

const LabelInputSetShort = ({labelText, placeholderText, name, type, value, onChange}) => {
    return (
        <div className="labelInputSet">
            <Label labelFor={name} labelText={labelText} />
            <InputTextShort type={type} name={name} value={value} placeholderText={placeholderText} onChange={onChange}/>
        </div>
    )   
}
export default LabelInputSetShort;