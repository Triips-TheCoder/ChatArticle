import "./Home.css"
import {useEffect, useState} from "react";
import {DB, AUTH} from "../../firebase"
import {collection, query, where, onSnapshot, DocumentData} from "firebase/firestore"
//import {User} from "firebase/auth";
import User from "../../components/User/User"

const Home = () => {
    const [users, setUsers] = useState<DocumentData[]>([])

    /* Permet d'envoyer une requête à la base de donnée pour obtenir la liste de tout les profiles
    autre que celui de l'utilisateur connecté. */
    useEffect(() => {
        const usersRef = collection(DB, 'users')
        const q = query(usersRef, where("uid", 'not-in', [AUTH.currentUser!.uid]))
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
        console.log(user)
    }

    return (
        <div className="home-container">
            <div className="users-container">
                {users.map(user => <User key={user.uid as string} user={user} selectUser={selectUser}/>)}
            </div>
        </div>
    )
}

export default Home