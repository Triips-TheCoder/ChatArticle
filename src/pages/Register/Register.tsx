import './Register.css'
import {useState} from "react"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {AUTH, DB} from '../../firebase'
import {setDoc, doc, Timestamp} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

interface SignInUser {
    name: string,
    email: string,
    password: string,
    error: null | string,
    loading: boolean
}

const Register = () => {
    const [data, setData] = useState<SignInUser>({
        name: '',
        email: '',
        password: '',
        error: null,
        loading: false
    })

    const navigate = useNavigate()

    const {name, email, password, error, loading} = data

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

        if (!name || !email || !password)
            setData({...data, error: "Veuillez renseigner tout les champs."})

        try {
            const result = await createUserWithEmailAndPassword(
                AUTH,
                email,
                password
            )

            await setDoc(doc(DB, 'users', result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true
            })

            setData({
                name: "",
                email: "",
                password: "",
                error: null,
                loading: false
            })

            navigate('/', {replace: true})
        } catch (err: any) {
            if (!name || !email || !password) {
                setData({
                    ...data,
                    error: 'Veuillez renseigner tout les champs.',
                    loading: false
                })
            } else if (password.length < 6) {
                setData({
                    ...data,
                    error: "Votre mot de passe doit contenir au moins 6 caractères.",
                    loading: false
                })
            }
        }
    }

    return (
        <section>
            <h3>Créer un compte</h3>
            <form className='form' onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="name">Nom:</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                </div>
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
                    <button className="btn" disabled={loading}>{loading ? "Inscription en cours..." : "S'inscrire !"}</button>
                </div>
            </form>
        </section>
    )
}

export default Register
