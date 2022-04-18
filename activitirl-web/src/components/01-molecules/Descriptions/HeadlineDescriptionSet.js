import TitleText from '../../00-atoms/text/TitleText'
import './style.css'

const HeadlineDescriptionSet = ({headline, description}) => {
    return (
        <div className="description">
            <h3>{headline}</h3>
            <p>{description}</p>              
        </div>
    )
}

export default HeadlineDescriptionSet
