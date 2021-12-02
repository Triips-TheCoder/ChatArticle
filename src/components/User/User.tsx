import "./User.css"
import profileImg from '../../../src/pages/Profile/logo192.png'
import {doc, DocumentData, onSnapshot} from "firebase/firestore"
import {useEffect, useState} from "react"
import {DB} from "../../firebase"

interface UserProps {
    user: DocumentData
    chat: DocumentData
    selectUser: (user: DocumentData) => void
    loggedInUserId: string
}

const User = (props: UserProps) => {
    const {user, selectUser, loggedInUserId, chat} = props
    const [data, setData] = useState<DocumentData>()
    const receivingUserId = user?.uid

    useEffect(() => {
        const messageId: string = loggedInUserId > receivingUserId ? `${loggedInUserId + receivingUserId}` : `${receivingUserId + loggedInUserId}`

        // @ts-ignore
        let unsub = onSnapshot(doc(DB, 'lastMessage', messageId), (doc: DocumentSnapshot<DocumentData>) => {
            setData(doc.data())
        })

        return () => unsub()
    }, [])

    return (
        <>
            <div className={`user-wrapper ${chat.name === user.name && 'selected-user'}`}
                 onClick={() => selectUser(user)}>
                <div className="user-info">
                    <div className="user-detail">
                        <img src={user.avatar || profileImg} alt="image de profile" className="avatar"/>
                        <h4>{user.name}</h4>
                        {data?.from !== loggedInUserId && data?.unread && <small className="unread">New</small>}
                    </div>
                    <div className={`user-status ${user.isOnline ? 'online' : 'offline'}`}/>
                </div>
                {data && (
                    <p className="truncate">
                        <strong>{data.from === loggedInUserId ? "Me" : null}</strong>
                        {data.text}
                    </p>
                )}
            </div>
            <div onClick={() => selectUser(user)} className={`sm-container ${chat.name === user.name && "selected-user"}`}>
                <img src={user.avatar || profileImg} alt="image de profil" className="avatar sm-screen"/>
            </div>
        </>

    )
}

export default User