import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Footer } from './footer/footer';
import { Header } from './header/header';

const Home = lazy(() => import('./home/home.page'));

export function App() {
    return (
        <>
            <Header />
            <Router>
                <Suspense fallback={<div>Loading…</div>}>
                    <Switch>
                        <Route path="/" component={Home} />
                    </Switch>
                </Suspense>
            </Router>
            <Footer />
        </>
    );
}
