import {Link} from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <h3><Link to="/">ChatArticle</Link></h3>
            <div>
                <Link to='/register'>S'inscrire</Link>
                <Link to='/login'>Se connecter</Link>
            </div>
        </nav>
    )
}

export default Navbar
