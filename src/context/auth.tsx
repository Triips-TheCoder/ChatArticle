import {createContext, useEffect, useState} from 'react'
import {onAuthStateChanged, User} from 'firebase/auth'
import {AUTH} from "../firebase"
import Loading from '../components/Loading/Loading'

type AuthContextProviderProps = {
    children: React.ReactNode
}

export const AuthContext = createContext<User | null>(null)

const AuthProvider = ({children}: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(AUTH, user => {
            setUser(user)
            setLoading(false)
        })
    }, [])

    if (loading)
        return <Loading/>

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export default AuthProvider
