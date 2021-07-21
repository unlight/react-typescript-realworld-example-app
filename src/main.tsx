/// <reference types="vite/client" />
import './index.css';

import { ArticleService, AuthenticationService, UserService } from '@libs/api';
import { inject, injector } from 'njct';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';
import { config } from './config';

injector.provide('config', () => config);
injector.provide('userregisterservice', () => inject.service(UserService));
injector.provide('articleservice', () => inject.service(ArticleService));
injector.provide('tagservice', () => inject.service(ArticleService));
injector.provide('authenticationservice', () => inject.service(AuthenticationService));

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.querySelector('#app'),
);
