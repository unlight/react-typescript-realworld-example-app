import './App.css';

import { Interface } from '@libs/application';
import { Footer, Loader, Loading, Navbar } from '@libs/ui';
import { inject } from 'njct';
import React, { Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { AppErrorBoundary } from './AppErrorBoundary';
import { Article, CreateArticle } from './article';
import { Home } from './home';
import { Feed } from './home/Feed';
import { Login } from './login';
import { Register } from './register';
import { Settings } from './settings';

const Profile = React.lazy(() => import('./profile'));

export function App() {
  const user = inject<Interface.SessionService>('sessionservice').getUser();
  return (
    <React.StrictMode>
      <RecoilRoot>
        <AppErrorBoundary>
          <HashRouter>
            <Navbar user={user} />
            <Suspense fallback={Loading}>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/feed" component={Feed} exact />
                <Route path="/article/:slug" component={Article}></Route>
                <Route path="/register" component={Register} />
                <Route path="/newpost" component={CreateArticle} />
                <Route path="/login" component={Login} />
                <Route path="/settings" component={Settings} />
                <Route path="/profile/:username" component={Profile} />
                <Route>
                  <div className="container page">404, Not Found!</div>
                </Route>
              </Switch>
            </Suspense>
            <Footer />
          </HashRouter>
        </AppErrorBoundary>
        <Loader />
      </RecoilRoot>
    </React.StrictMode>
  );
}
