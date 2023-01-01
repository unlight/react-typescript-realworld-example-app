import './App.css';

import { Footer, Loader, Loading, Navbar } from '@components';
import { inject } from 'njct';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { AppErrorBoundary } from './AppErrorBoundary';
import { Article, CreateArticlePage } from './article';
import { SessionServiceInterface } from './auth';
import { HomePage } from './home';
import { Feed } from './home/Feed';
import { Login } from './login';
import { Register } from './register';
import { Settings } from './settings';
import * as Tokens from './tokens';

const Profile = (
  <Suspense fallback={Loading}>
    {React.createElement(React.lazy(() => import('./profile')))}
  </Suspense>
);

export function App() {
  const sessionService = inject<SessionServiceInterface>(Tokens.SessionService);

  return (
    <React.StrictMode>
      <RecoilRoot>
        <AppErrorBoundary>
          <BrowserRouter>
            <Navbar user={sessionService.getUser()} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/article/:slug" element={<Article />}></Route>
              <Route path="/register" element={<Register />} />
              <Route path="/newpost" element={<CreateArticlePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile/:username" element={Profile} />
              <Route
                path="*"
                element={<div className="container page">404, Not Found!</div>}
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AppErrorBoundary>
        <Loader />
      </RecoilRoot>
    </React.StrictMode>
  );
}
