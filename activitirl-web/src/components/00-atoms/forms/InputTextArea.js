import './style.css'

const InputTextArea = ({name, placeholderText, rows, cols}) => {
    return (
        <textarea className="formInputText"
            name={name} 
            placeholder={placeholderText} 
            rows={rows} 
            cols={cols} 
        />
    )
}

export default InputTextArea;