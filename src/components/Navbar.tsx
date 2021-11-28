import "./Navbar.css"
import {Link} from "react-router-dom"
import {AUTH, DB} from '../firebase'
import {signOut} from "firebase/auth"
import {updateDoc, doc} from 'firebase/firestore'

const Navbar = () => {
    const handleSignOut = async () => {
        await updateDoc(
            doc(DB, 'users', AUTH.currentUser!.uid),
            {
                isOnline: false
            })
        await signOut(AUTH)
    }

    //useEffect(() => {
    //    onAuthStateChanged(AUTH, user => {
    //        if (user)
    //            console.log(AUTH.currentUser)
    //        else
    //            console.log("l'utilisateur est déconnecter")
    //    })
    //}, [])

    return (
        <nav>
            <h3><Link to="/">ChatArticle</Link></h3>
            <div>
                {AUTH.currentUser ? (
                    <>
                        <Link to='/profile'>Profile</Link>
                        <button className="btn" onClick={handleSignOut}>Se déconnecter</button>
                    </>
                ) : (
                    <>
                        <Link to='/register'>S'inscrire</Link>
                        <Link to='/login'>Se connecter</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
