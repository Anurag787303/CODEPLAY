import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, removeItem } from '../Utils/User'
import { useState } from 'react'

// create a homepage for the online coding platform
// use tailwind css to style the page
// header should have name of the platform, AlgoForge in bold
// links for login and register, problems and profile
// body should have a welcome message
// footer should have a message about the platform
// don't leave large white spaces
// export the component

const Home = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        removeItem('user')
        navigate('/')
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="flex flex-col h-screen">
            <header className="flex items-center justify-between h-20 bg-blue-600 px-20 shadow-md">
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
            <main className="flex flex-col items-center justify-center flex-grow bg-gray-100">
                <section className="text-center py-20">
                    <h1 className="text-5xl font-bold mb-4">Welcome to AlgoForge</h1>
                    <p className="text-lg mb-8">An online coding platform to practice and improve your coding skills.</p>
                    <Link to="/problems" className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300">Start Solving Problems</Link>
                </section>
                <section className="w-full bg-white py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-bold mb-2">Practice Problems</h3>
                                <p>Access a wide range of coding problems to practice and improve your skills.</p>
                            </div>
                            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-bold mb-2">Contests</h3>
                                <p>Participate in coding contests and compete with others to test your skills.</p>
                            </div>
                            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-bold mb-2">Profile</h3>
                                <p>Track your progress and showcase your achievements on your profile.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex items-center justify-center h-20 bg-blue-500">
                <p className="text-white">© 2023 AlgoForge. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Home