import './App.css';

import { Footer, Navbar } from '@libs/ui';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { Route, Switch } from 'wouter';

import { Home } from './Home';
import { Register } from './Register';

export function App(): JSX.Element {
    return (
        <RecoilRoot>
            <Navbar />
            <Switch>
                <Route path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route>
                    <div className="container page">404, Not Found!</div>
                </Route>
            </Switch>
            <Footer />
        </RecoilRoot>
    );
}
