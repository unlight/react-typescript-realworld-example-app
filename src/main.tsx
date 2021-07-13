/// <reference types="vite/client" />
import './index.css';

import { injector } from 'njct';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';
import { config } from './config';

injector.provide('config', () => config);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.querySelector('#app'),
);
