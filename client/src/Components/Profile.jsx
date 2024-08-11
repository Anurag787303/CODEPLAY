import React from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { isAuthenticated, removeItem, getUser } from '../Utils/User'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

const Profile = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        removeItem('user')
        navigate('/')
    }

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const user = getUser()

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Problems Solved',
                data: [12, 19, 3, 5, 2, 3, 7],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Problems Created',
                data: [2, 3, 20, 5, 1, 4, 10],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
                label: 'Problems Attempted',
                data: [3, 10, 13, 15, 22, 30, 45],
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
        ],
    }

    return (
        (!isAuthenticated()) ? <Navigate to="/login" /> :
            (
                <div className="flex flex-col h-screen">
                    <header className="flex items-center justify-between min-h-20 bg-blue-600 px-20 shadow-md">
                        <div className="flex items-center space-x-4">
                            <Link to="/">
                                <h1 className="text-3xl font-bold text-white">AlgoForge</h1>
                            </Link>
                        </div>
                        <nav className="flex items-center space-x-6">
                            <Link to="/problems" className="text-white hover:text-gray-200 transition duration-300">Problems</Link>
                            {isAuthenticated() ? (
                                <div className="relative">
                                    <button
                                        onClick={toggleDropdown}
                                        className="text-white hover:text-gray-200 transition duration-300 focus:outline-none"
                                    >
                                        Account
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                                            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-white hover:text-gray-200 transition duration-300">Login</Link>
                                    <Link to="/register" className="text-white hover:text-gray-200 transition duration-300">Register</Link>
                                </>
                            )}
                        </nav>
                    </header>
                    <main className="flex flex-col items-center justify-center flex-1 bg-gray-100 p-6">
                        <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
                            <h1 className="text-4xl font-bold mb-4">Profile</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold mb-4">User Details</h2>
                                    <p className="text-lg"><strong>Username:</strong> {user.username}</p>
                                    <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                                    <p className="text-lg"><strong>Date Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold mb-4">Actions</h2>
                                    <Link to="/problems" className="block bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300 mb-4 text-center">View Your Problems</Link>
                                    <Link to="/create-problem" className="block bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition duration-300 mb-4 text-center">Create New Problem</Link>
                                    <button className="block bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 transition duration-300 text-center" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                            <div className="w-full mt-8">
                                <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
                                <Line data={data} />
                            </div>
                        </div>
                    </main>
                    <footer className="flex items-center justify-center min-h-20 bg-blue-600 text-white">
                        <p className="text-sm">AlgoForge &copy; 2024</p>
                    </footer>
                </div>
            )
    )
}

export default Profile