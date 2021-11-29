import './Profile.css'
import profileImg from '../../../src/pages/Profile/logo192.png'
import Camera from '../../components/svg/Camera'
import { useState } from 'react'

const Profile = () => {
    const [img, setImg] = useState<File | null>(null)
    console.log(img)
    return (
        <section className="register-login">
            <div className="profile-container">
                <div className="img-container">
                    <img src={profileImg} alt="avatar"/>
                    <div className="overlay">
                        <div>
                            <label htmlFor="photo">
                                <Camera/>
                            </label>
                            <input type="file" accept="image/*" style={{display: "none"}} id="photo" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const inputEl = e.target as HTMLInputElement
                                setImg(inputEl.files![0])
                            }}/>
                        </div>
                    </div>
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