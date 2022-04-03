import './style.css'

const InputText = ({type, id, name, placeholderText, value, onChange}) => {
    return (
        <input className="formInputText"
            type={type} 
            id={id} 
            name={name} 
            placeholder={placeholderText}
            value={value}
            onChange={onChange}
        />
    )
}

export default InputText;