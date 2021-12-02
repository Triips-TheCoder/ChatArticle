import "./Home.css"
import React, {useEffect, useState} from "react";
import {AUTH, DB, STORAGE} from "../../firebase"
import {
    addDoc,
    collection,
    DocumentData,
    onSnapshot,
    query,
    Timestamp,
    where,
    orderBy,
    setDoc, doc, getDoc, updateDoc
} from "firebase/firestore"
import User from "../../components/User/User"
import MessageForm from "../../components/MessageForm/MessageForm";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import Message from "../../components/Message/Message";

const Home = () => {
    const [users, setUsers] = useState<DocumentData[]>([])
    const [chat, setChat] = useState<DocumentData>({})
    const [text, setText] = useState<string>("")
    const [img, setImg] = useState<File | null>(null)
    const [messages, setMessages] = useState<DocumentData[]>([])
    const loggedInUserId = AUTH.currentUser!.uid

    /* Permet d'envoyer une requête à la base de donnée
       pour obtenir la liste de tout les profiles
       autre que celui de l'utilisateur connecté.
    */
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

    /**
     * @param user {DocumentData} - L'utilisateur sur lequel l'utilisateur connecté a cliqué
     * @description Envoie une requête vers la base de donnée pour obtenir tout les messages envoyés entre deux utilisateurs.
     */
    const selectUser = async (user: DocumentData) => {
        try {
            // Utilisateur sélectionné
            setChat(user)

            const receivingUser: string = user.uid
            const messagesId: string = loggedInUserId > receivingUser ? `${loggedInUserId + receivingUser}` : `${receivingUser + loggedInUserId}`

            const msgRef = collection(DB, "messages", messagesId, 'chat')
            const q = query(msgRef, orderBy('createdAt', 'asc'))

            onSnapshot(q, querySnapshot => {
                let freshMessages: DocumentData[] = []

                querySnapshot.forEach((doc) => {
                    freshMessages.push(doc.data())
                })

                setMessages(freshMessages)
            })

            const docSnap = await getDoc(doc(DB, "lastMessage", messagesId))

            /* Utilise la fonction updateDoc de firebase pour UPDATE la valeur unread du dernier message envoyé
               Cela permet d'enlever la notification "NEW" seulement si c'est l'utilisateur qui a reçu le message qui clique sur le message.
            */
            if (docSnap.data()?.from !== loggedInUserId) {
                await updateDoc(doc(DB, 'lastMessage', messagesId), {unread: false})
            }

        } catch(err: any) {
            console.error(err)
        }
    }

    /**
     * @param e{React.FormEvent<HTMLFormElement>} - Event d'envoie du formalaire
     * @description Envoie les messages / images rentrer dans l'input du chat dans la base de donnée et reset l'input à "".
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const receivingUserId: string = chat.uid
        const messageId: string = loggedInUserId > receivingUserId ? `${loggedInUserId + receivingUserId}` : `${receivingUserId + loggedInUserId}`

        let url: string

        try {
            if (img) {
                const imgRef = ref(STORAGE, `images/${new Date().getTime()} - ${img.name}`)
                const snap = await uploadBytes(imgRef, img)
                url = await getDownloadURL(ref(STORAGE, snap.ref.fullPath))
            }

            await addDoc(collection(DB, "messages", messageId, "chat"), {
                text,
                from: loggedInUserId,
                to: receivingUserId,
                media: url! || "",
                createdAt: Timestamp.fromDate(new Date())
            })

            await setDoc(doc(DB, 'lastMessage', messageId), {
                text,
                from: loggedInUserId,
                to: receivingUserId,
                media: url! || "",
                unread: true,
            })

            setText("")
        } catch (err: any) {
          console.error(err.message)
        }
    }

    return (
        <div className="home-container">
            <div className="users-container">
                {users.map(user => <User key={user.uid as string} user={user} selectUser={selectUser} loggedInUserId={loggedInUserId} chat={chat}/>)}
            </div>
            <div className="messages-container">
                {chat ?
                    <>
                        <div className="messages-user">
                            <h3>{chat.name}</h3>
                        </div>
                        <div className="messages">
                            {messages.length ? messages.map((message, i) => <Message key={i} message={message} loggedInUserId={loggedInUserId}/>) : null}
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