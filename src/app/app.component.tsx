import React, { Component, lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Footer } from './footer/footer.component';
import { Header } from './header/header.component';

const Home = lazy(() => import('./home/home.component'));

export class App extends Component<any, any> {
    render() {
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
}
