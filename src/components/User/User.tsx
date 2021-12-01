import "./User.css"
import profileImg from '../../../src/pages/Profile/logo192.png'
import {DocumentData} from "firebase/firestore";

interface UserProps extends  DocumentData {
    selectUser: (user: DocumentData) => void
}

const User = (props: UserProps) => {
    return (
        <div className="user-wrapper" onClick={() => props.selectUser(props.user)}>
            <div className="user-info">
                <div className="user-detail">
                    <img src={props.user.avatar || profileImg} alt="image de profile" className="avatar"/>
                    <h4>{props.user.name}</h4>
                </div>
                <div className={`user-status ${props.user.isOnline ? 'online' : 'offline'}`}/>
            </div>
        </div>
    )
}

export default User