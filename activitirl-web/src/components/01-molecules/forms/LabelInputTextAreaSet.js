import InputTextArea from "../../00-atoms/forms/InputTextArea";
import Label from "../../00-atoms/forms/Label";
import './style.css'

const LabelInputTextAreaSet = ({labelText, placeholderText, name, rows, cols, value, onChange}) => {
    return (
        <div className="labelInputTextAreaSet">
            <Label labelFor={name} labelText={labelText} />
            <InputTextArea name={name} value={value} rows={rows} cols={cols} placeholderText={placeholderText} onChange={onChange}/>
        </div>
    )   
}
export default LabelInputTextAreaSet;