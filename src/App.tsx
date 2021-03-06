import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar"
import Register from "./pages/Register/Register"
import Login from './pages/Login/Login'
import AuthProvider from './context/auth'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Profile from './pages/Profile/Profile'
import './App.css'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    }/>
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <Profile/>
                        </PrivateRoute>
                    }/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
