/// <reference types="vite/client" />
import './index.css';

import { ArticleService, config, SessionService, UserService } from '@application/api';
import { inject, injector } from 'njct';
import React from 'react';
import ReactDOM from 'react-dom';

import * as tokens from './application/tokens';
import { App } from './pages';

injector.provide(tokens.Config, () => config);
injector.provide(tokens.UserService, () => inject(UserService));
injector.provide(tokens.ArticleService, () => inject(ArticleService));
injector.provide('tagservice', () => inject(ArticleService));
injector.provide('sessionservice', () => inject(SessionService));

ReactDOM.render(<App />, document.querySelector('#app'));
