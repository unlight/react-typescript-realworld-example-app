/// <reference types="vite/client" />
import './index.css';

import { UserService } from '@libs/api';
import { inject, injector } from 'njct';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';
import { config } from './config';

injector.provide('config', () => config);
injector.provide('UserRegisterService', () => inject.service(UserService));

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.querySelector('#app'),
);
