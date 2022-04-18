import './style.css'

const ProfilePictureName = ({name}) => {
    return (
        <div className="profile">
            <h3 className='profile-name'>{name}</h3>
            <img className="profilePicture" src={require("../../../images/profilePicture.jpg")}></img>
        </div>
    )
}

export default ProfilePictureName