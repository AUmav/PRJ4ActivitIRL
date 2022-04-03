import InputText from "../../00-atoms/forms/InputText";
import Label from "../../00-atoms/forms/Label";
import './style.css'

const LabelInputSet = ({labelText, placeholderText, name, type, value, onChange}) => {
    return (
        <div className="labelInputSet">
            <Label labelFor={name} labelText={labelText} />
            <InputText type={type} name={name} value={value} placeholderText={placeholderText} onChange={onChange}/>
        </div>
    )   
}
export default LabelInputSet;