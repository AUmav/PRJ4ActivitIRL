import './style.css'

const InputTextShort = ({type, id, name, placeholderText, value, onChange}) => {
    return (
        <input className="formInputTextShort"
            type={type} 
            id={id} 
            name={name} 
            placeholder={placeholderText}
            value={value}
            onChange={onChange}
        />
    )
}

export default InputTextShort;