import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Problems = () => {
    const [problems, setProblems] = useState([])

    useEffect(() => {
        fetch(`${[process.env.REACT_APP_API_URL]}/api/v1/problem/`)
            .then(res => res.json())
            .then(data => setProblems(data.problems))
    }, [])

    return (
        <div className='flex-col'>
            <div className="flex items-center justify-center h-20 bg-blue-500">
                <h1 className="text-3xl font-bold text-white">Problems</h1>
            </div>
            <div className="flex-col">
                {problems.map((problem, index) => {
                    return (
                        <Link to={`/problem/${problem._id}`} key={problem._id}>
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100">
                                <div>
                                    <h2 className="text-xl font-bold">{index + 1}. {problem.title}</h2>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </div>
    )
}

export default Problems