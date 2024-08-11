import React from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { setItem, isAuthenticated } from '../Utils/User'

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                setItem('user', JSON.stringify(data.user))
                navigate('/')
                setLoading(false)

            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            })
    }

    return (
        (isAuthenticated()) ? <Navigate to="/" /> :
            <div className="flex justify-center items-center h-screen">
                <form className="w-1/3 p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
                    <h1 className="text-3xl font-bold mb-8">Login</h1>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="username" id="username" name="username" className="mt-1 p-2 w-full border border-gray-300 rounded-md" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-md" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md" onClick={handleSubmit}>
                        {loading ? 'Submitting...' : 'Login'}
                    </button>
                    <p className="mt-4 text-center">Don't have an account? <Link to="/register" className="text-blue-500" >Sign Up</Link></p>
                </form>
            </div >
    )
}

export default Login