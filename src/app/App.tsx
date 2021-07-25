import './App.css';

import { Interface } from '@libs/application';
import { Footer, Navbar } from '@libs/ui';
import { inject } from 'njct';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Article, CreateArticle } from './article';
import { Home } from './home';
import { Feed } from './home/Feed';
import { Login } from './login';
import { Register } from './register';
import { Settings } from './settings';

export function App(): JSX.Element {
    const user = inject<Interface.SessionService>('sessionservice').getUser();
    return (
        <>
            <HashRouter>
                <Navbar user={user} />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/feed" component={Feed} exact />
                    <Route path="/article/:slug" component={Article}></Route>
                    <Route path="/register" component={Register} />
                    <Route path="/newpost" component={CreateArticle} />
                    <Route path="/login" component={Login} />
                    <Route path="/settings" component={Settings} />
                    <Route>
                        <div className="container page">404, Not Found!</div>
                    </Route>
                </Switch>
                <Footer />
            </HashRouter>
        </>
    );
}
