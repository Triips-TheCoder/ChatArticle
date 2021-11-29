import "./Navbar.css"
import {Link} from "react-router-dom"
import {AUTH, DB} from '../../firebase'
import {signOut} from "firebase/auth"
import {updateDoc, doc} from 'firebase/firestore'
import {useContext} from "react"
import {AuthContext} from "../../context/auth"
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const user = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await updateDoc(
            doc(DB, 'users', AUTH.currentUser!.uid),
            {
                isOnline: false
            })
        await signOut(AUTH)

        navigate("/login", {replace: true})
    }

    return (
        <nav>
            <h3><Link to="/">ChatArticle</Link></h3>
            <div>
                {user ? (
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
