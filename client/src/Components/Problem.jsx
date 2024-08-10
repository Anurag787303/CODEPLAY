import React, { useState, useRef, useEffect } from 'react';
import './Problem.css';
import { useParams } from 'react-router-dom';

const Problem = () => {
    const { id } = useParams();
    const [leftWidth, setLeftWidth] = useState('50%');
    const resizerRef = useRef(null);
    const [problem, setProblem] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState('cpp');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/problem/${id}`)
            .then(res => res.json())
            .then(data => setProblem(data.problem));

        const handleMouseMove = (e) => {
            if (resizerRef.current) {
                const newLeftWidth = e.clientX / window.innerWidth * 100;
                setLeftWidth(`${newLeftWidth}%`);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        const handleMouseDown = () => {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        if (resizerRef.current) {
            resizerRef.current.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            if (resizerRef.current) {
                resizerRef.current.removeEventListener('mousedown', handleMouseDown);
            }
        };
    }, []);

    const submitHandler = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/problem/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                src: code,
                input: problem.testcases[0].input,
                lang: selectedLanguage,
                timeOut: 2,
            }),
        })
            .then((res) => res.json())
            .then((data) => setOutput(data.response.data));
    };

    return (
        <div className="flex h-screen">
            <div className="flex flex-col overflow-y-auto" style={{ width: leftWidth }}>
                <div className="flex items-center justify-center min-h-20 bg-blue-500">
                    <h1 className="text-3xl font-bold text-white">{problem.title}</h1>
                </div>
                <div className="flex flex-col p-4">
                    <h2 className="text-xl font-bold">Description</h2>
                    <p>{problem.description}</p>
                </div>
                <div className="flex flex-col p-4">
                    <h2 className="text-xl font-bold">Testcases</h2>
                    {problem.testcases?.map((testcase, index) => (
                        <div key={index} className="p-4 mb-4 border border-gray-200 rounded bg-gray-100">
                            <div className="mb-2">
                                <h3 className="text-lg font-bold">Input</h3>
                                <pre className="p-2 bg-white border border-gray-300 rounded">{testcase.input}</pre>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Output</h3>
                                <pre className="p-2 bg-white border border-gray-300 rounded">{testcase.output}</pre>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div ref={resizerRef} className="resizer"></div>
            <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-center min-h-20 bg-blue-500">
                    <h1 className="text-3xl font-bold text-white">IDE</h1>
                </div>
                <div className="flex flex-col p-4">
                    <label htmlFor="language-select" className="text-xl font-bold">Select Language</label>
                    <select
                        id="language-select"
                        className="p-2 border border-gray-200 rounded"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python3">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>
                <div className="flex flex-col p-4">
                    <h2 className="text-xl font-bold">Code</h2>
                    <textarea className="w-full h-72 p-4 border border-gray-200" onChange={(e) => setCode(e.target.value)}></textarea>
                </div>
                <div className="flex flex-col p-4">
                    <h2 className="text-xl font-bold">Output</h2>
                    <textarea className="w-full h-24 p-4 border border-gray-200" disabled value={output}></textarea>
                </div>
                <div className="flex flex-col p-4">
                    <button className="bg-blue-500 text-white p-2 rounded" onClick={submitHandler}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Problem;