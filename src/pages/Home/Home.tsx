import {useEffect, useState} from "react";
import {DB, AUTH} from "../../firebase"
import {collection, query, where, onSnapshot} from "firebase/firestore"

const Home = () => {
    const [users, setUsers] = useState<{}[]>([])

    /* Permet d'envoyer une requête à la base de donnée pour obtenir la liste de tout les profiles
    autre que celui de l'utilisateur connecté. */
    useEffect(() => {
        const usersRef = collection(DB, 'users')
        const q = query(usersRef, where("uid", 'not-in', [AUTH.currentUser!.uid]))
        const unsub = onSnapshot(q, querySnapshot => {
            let allUsersExceptConnectedUsers: {}[] = []
            querySnapshot.forEach(doc => {
                allUsersExceptConnectedUsers.push([doc.data()])
            })
            setUsers(allUsersExceptConnectedUsers)
        })

        return () => unsub()
    }, [])

    console.log(users)
    return (
        <div>
            <h1>Bienvenue sur la page Home</h1>
        </div>
    )
}

export default Home