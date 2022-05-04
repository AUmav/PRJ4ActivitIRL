import './style.css'

const ProfilePictureNameNavigation = ({name}) => {
    return (
        <div className="profile-nav">
            <a className='profile-name-nav'>{name}</a>
            <img className="profilePicture" src={require("../../../images/profilePicture.jpg")}></img>
        </div>
    )
}

export default ProfilePictureNameNavigation;