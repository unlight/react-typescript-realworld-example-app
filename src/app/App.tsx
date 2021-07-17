import './App.css';

import { Footer, Navbar } from '@libs/ui';
import React from 'react';
import { Route, Switch } from 'wouter';

import { Article, CreateArticle } from './article';
import { Home } from './home';
import { Login } from './login';
import { Register } from './register';

export function App(): JSX.Element {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" component={Home} />
                <Route path="/article/:slug" component={Article}></Route>
                <Route path="/register" component={Register} />
                <Route path="/newpost" component={CreateArticle} />
                <Route path="/login" component={Login} />
                <Route>
                    <div className="container page">404, Not Found!</div>
                </Route>
            </Switch>
            <Footer />
        </>
    );
}
