/// <reference types="vite/client" />
import './index.css';

import { inject, injector } from 'njct';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { ArticleService } from './app/article';
import { config } from './app/config';
import * as tokens from './app/tokens';
import { UserService } from './app/user';

injector.provide(tokens.Config, () => config);
injector.provide(tokens.UserService, () => inject(UserService));
injector.provide(tokens.ArticleService, () => inject(ArticleService));
injector.provide(tokens.TagService, () => inject(ArticleService));

if (!document.body.firstChild) {
  throw new Error('Cannot find element in body');
}

const root = createRoot(document.body.firstChild as Element);
root.render(<App />);
