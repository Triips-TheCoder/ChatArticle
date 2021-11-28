import {FC, useContext} from 'react'
import {Navigate, PathRouteProps, Route, RouteProps} from 'react-router-dom'
import {AuthContext} from '../../context/auth'
import Home from '../../pages/Home/Home'

const PrivateRoute = ({children}: { children: JSX.Element}) => {

    const user = useContext(AuthContext)

    if (!user)
        return (
            <Navigate to="/login"/>
        )

    return children
}

export default PrivateRoute