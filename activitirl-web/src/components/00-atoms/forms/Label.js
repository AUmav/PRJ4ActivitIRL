import './style.css'

const Label = ({labelFor, labelText}) => {
    return (
        <label for={labelFor}>{labelText}</label>
    )
}

export default Label;