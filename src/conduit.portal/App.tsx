import './App.css';

import { Footer, Navbar } from '@libs/ui';
import React from 'react';
import { Route } from 'wouter';

import { Register } from './pages/Register';

export function App(): JSX.Element {
    return (
        <>
            <Navbar />
            <Route path="/register" component={Register} />
            <Footer />
        </>
    );
}
