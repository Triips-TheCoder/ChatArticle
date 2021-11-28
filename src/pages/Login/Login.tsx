import {useState} from "react"
import {signInWithEmailAndPassword} from "firebase/auth"
import {AUTH, DB} from '../../firebase'
import {updateDoc, doc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

interface LoginUser {
    email: string,
    password: string,
    error: null | string,
    loading: boolean
}

const Login = () => {
    const [data, setData] = useState<LoginUser>({
        email: '',
        password: '',
        error: null,
        loading: false
    })

    const navigate = useNavigate()

    const {email, password, error, loading} = data

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setData({...data, [target.name]: target.value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setData({
            ...data,
            error: null,
            loading: true
        })

        if (!email || !password)
            setData({...data, error: "Veuillez remplir tout les champs."})

        try {
            const result = await signInWithEmailAndPassword(
                AUTH,
                email,
                password
            )
            await updateDoc(doc(DB, 'users', result.user.uid), {isOnline: true})

            setData({
                email: "",
                password: "",
                error: null,
                loading: false
            })

            navigate('/', {replace: true})
        } catch (err: any) {
            setData({
                ...data,
                error: "Email ou mot de passe incorrect.",
                loading: false
            })
        }
    }

    return (
        <section>
            <h3>Se connecter à votre compte</h3>
            <form className='form' onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleChange}/>
                </div>
                <div className="input-container">
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleChange}/>
                </div>
                {error && <p className="error">{error}</p>}
                <div className="btn-container">
                    <button className="btn" disabled={loading}>{loading ? 'Connexion en cours ...' : 'Connecter'}</button>
                </div>
            </form>
        </section>
    )
}

export default Login