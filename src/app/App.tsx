import './App.css';

import { SessionServiceInterface, Tokens } from '@application';
import { Footer, Loader, Loading, Navbar } from '@components';
import { inject } from 'njct';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { AppErrorBoundary } from './AppErrorBoundary';
import { Article, CreateArticle } from './article';
import { Home } from './home';
import { Feed } from './home/Feed';
import { Login } from './login';
import { Register } from './register';
import { Settings } from './settings';

const Profile = (
  <Suspense fallback={Loading}>
    {React.createElement(React.lazy(() => import('./profile')))}
  </Suspense>
);

export function App() {
  const user = inject<SessionServiceInterface>(Tokens.SessionService).getUser();
  return (
    <React.StrictMode>
      <RecoilRoot>
        <AppErrorBoundary>
          <BrowserRouter>
            <Navbar user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/article/:slug" element={<Article />}></Route>
              <Route path="/register" element={<Register />} />
              <Route path="/newpost" element={<CreateArticle />} />
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
