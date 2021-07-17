import React from 'react';
import { useLocation } from 'wouter';

import { NavItem } from './NavItem';

export function Navbar(): JSX.Element {
    const [location] = useLocation(); // TODO: Fix DI direction violation

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    conduit
                </a>
                <ul className="nav navbar-nav pull-xs-right">
                    <NavItem name="Home" href="/" active={location === '/'} />
                    <NavItem
                        name="New Post"
                        href="/newpost"
                        icon="ion-compose"
                        active={location === '/newpost'}
                    />
                    <NavItem
                        name="Settings"
                        href=""
                        icon="ion-gear-a"
                        active={location === '/settings'}
                    />
                    <NavItem
                        name="Sign up"
                        href="/register"
                        active={location === '/register'}
                    />
                </ul>
            </div>
        </nav>
    );
}
