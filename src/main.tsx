/// <reference types="vite/client" />
import './index.css';

import {
  ArticleService,
  config,
  SessionService,
  UserService,
} from '@application/api';
import { inject, injector } from 'njct';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import * as tokens from './application/tokens';

injector.provide(tokens.Config, () => config);
injector.provide(tokens.UserService, () => inject(UserService));
injector.provide(tokens.ArticleService, () => inject(ArticleService));
injector.provide('tagservice', () => inject(ArticleService));
injector.provide('sessionservice', () => inject(SessionService));

const root = createRoot(document.querySelector('#app')!);
root.render(<App />);
