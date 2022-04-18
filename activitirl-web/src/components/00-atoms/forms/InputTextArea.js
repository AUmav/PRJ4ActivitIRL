import './style.css'

const InputTextArea = ({name, placeholderText, rows, cols, value, onChange}) => {
    return (
        <textarea className="formInputTextArea"
            name={name} 
            placeholder={placeholderText} 
            rows={rows} 
            cols={cols} 
            value={value}
            onChange={onChange}
        />
    )
}

export default InputTextArea;