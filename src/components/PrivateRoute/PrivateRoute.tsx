import {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {AuthContext} from '../../context/auth'

const PrivateRoute = ({children}: { children: JSX.Element}) => {

    const user = useContext(AuthContext)

    if (!user)
        return (
            <Navigate to="/login"/>
        )

    return children
}

export default PrivateRoute
