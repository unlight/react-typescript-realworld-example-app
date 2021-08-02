/// <reference types="vite/client" />
import './index.css';

import { ArticleService, config, SessionService, UserService } from '@libs/api';
import { Loader } from '@libs/ui/Loader';
import { inject, injector } from 'njct';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';
import { RecoilRoot } from 'recoil';

injector.provide('config', () => config);
injector.provide('userservice', () => inject.service(UserService));
injector.provide('articleservice', () => inject.service(ArticleService));
injector.provide('tagservice', () => inject.service(ArticleService));
injector.provide('sessionservice', () => inject.service(SessionService));

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
            <Loader />
        </RecoilRoot>
    </React.StrictMode>,
    document.querySelector('#app'),
);
