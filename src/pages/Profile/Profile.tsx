import './Profile.css'
import profileImg from '../../../src/pages/Profile/logo192.png'

const Profile = () => {
    return (
        <section className="register-login profile">
            <div className="profile-container">
                <div className="img-container">
                    <img src={profileImg} alt="avatar"/>
                </div>
                <div className="text-container">
                    <h3>Nom d'utilisateur</h3>
                    <p>Email de l'utilisateur</p>
                    <hr/>
                    <small>Rejoindre...</small>
                </div>
            </div>
        </section>
    )
}

export default Profile