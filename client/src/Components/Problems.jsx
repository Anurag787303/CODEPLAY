import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, removeItem } from '../Utils/User'

const Problems = () => {
    const [problems, setProblems] = useState([])

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        removeItem('user')
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/problem/`)
            .then(res => res.json())
            .then(data => setProblems(data.problems))
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between h-20 bg-blue-600 px-20 shadow-md">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-3xl font-bold text-white">AlgoForge</Link>
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
                    <h1 className="text-4xl font-bold mb-4">Problems</h1>
                    <p className="text-lg mb-8">Explore and solve problems to improve your skills.</p>
                    <div className="w-full">
                        {problems.length > 0 ? (
                            problems.map((problem, index) => (
                                <Link to={`/problem/${problem._id}`} key={problem._id}>
                                    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-300">
                                        <div>
                                            <h2 className="text-xl font-bold">{index + 1}. {problem.title}</h2>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-lg text-center">No problems available at the moment. Please check back later.</p>
                        )}
                    </div>
                </div>
            </main>
            <footer className="flex items-center justify-center h-20 bg-blue-600 text-white">
                <p className="text-sm">AlgoForge &copy; 2024</p>
            </footer>
        </div>
    )
}

export default Problems