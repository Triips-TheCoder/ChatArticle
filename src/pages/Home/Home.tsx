import "./Home.css"
import React, {useEffect, useState} from "react";
import {AUTH, DB, STORAGE} from "../../firebase"
import {addDoc, collection, DocumentData, onSnapshot, query, Timestamp, where} from "firebase/firestore"
import User from "../../components/User/User"
import MessageForm from "../../components/MessageForm/MessageForm";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"

const Home = () => {
    const [users, setUsers] = useState<DocumentData[]>([])
    const [chat, setChat] = useState<DocumentData>({})
    const [text, setText] = useState<string>("")
    const [img, setImg] = useState<File | null>(null)
    const loggedInUserId = AUTH.currentUser!.uid

    /* Permet d'envoyer une requête à la base de donnée
    pour obtenir la liste de tout les profiles
    autre que celui de l'utilisateur connecté. */
    useEffect(() => {
        const usersRef = collection(DB, 'users')
        const q = query(usersRef, where("uid", 'not-in', [loggedInUserId]))
        const unsub = onSnapshot(q, querySnapshot => {
            let allUsersExceptConnectedUsers: DocumentData[] = []
            querySnapshot.forEach(doc => {
                allUsersExceptConnectedUsers.push(doc.data())
            })
            setUsers(allUsersExceptConnectedUsers)
        })

        return () => unsub()
    }, [])

    const selectUser = (user: DocumentData) => {
        setChat(user)
        console.log(user)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const receivingUserId: string = chat.uid
        const messagesId: string = loggedInUserId > receivingUserId ? `${loggedInUserId + receivingUserId}` : `${receivingUserId + loggedInUserId}`

        let url: string

        if (img) {
            const imgRef = ref(STORAGE, `images/${new Date().getTime()} - ${img.name}`)
            const snap = await uploadBytes(imgRef, img)
            url = await getDownloadURL(ref(STORAGE, snap.ref.fullPath))
        }

        await addDoc(collection(DB, "messages", messagesId, "chat"), {
            text,
            from: loggedInUserId,
            to: receivingUserId,
            media: url! || "",
            createdAt: Timestamp.fromDate(new Date())
        })

        setText('')
    }

    return (
        <div className="home-container">
            <div className="users-container">
                {users.map(user => <User key={user.uid as string} user={user} selectUser={selectUser}/>)}
            </div>
            <div className="messages-container">
                {chat ?
                    <>
                        <div className="messages-user">
                            <h3>{chat.name}</h3>
                        </div>
                        <MessageForm
                            handleSubmit={handleSubmit}
                            text={text}
                            setText={setText}
                            setImg={setImg}/>
                    </>
                    :
                    <h3 className="no-conv">Selectionne un utilisateur pour commencer une conversation</h3>}
            </div>
        </div>
    )
}

export default Home