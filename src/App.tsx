import './App.css';

import React, { useState } from 'react';

import logo from './logo.svg';

export function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App container mx-auto my-1">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello Vite + React!</p>
                <p>
                    <button onClick={() => setCount(count => count + 1)}>
                        count is: {count}
                    </button>
                </p>
                <p>
                    Edit <code>App.tsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {' | '}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite Docs
                    </a>
                </p>
                <p className="flex-row App-stack">
                    Stack
                    <span
                        className="iconify"
                        data-icon="fa-brands:react"
                        data-inline="false"
                    >
                        React
                    </span>
                    <span className="iconify" data-icon="cib:jest" data-inline="false">
                        Jest
                    </span>
                    <span
                        className="iconify"
                        data-icon="cib:eslint"
                        data-inline="false"
                    >
                        ESLint
                    </span>
                </p>
            </header>
        </div>
    );
}
