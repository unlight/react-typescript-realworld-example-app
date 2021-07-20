import React from 'react';

import { NavItem } from './NavItem';

export function Navbar(): JSX.Element {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    conduit
                </a>
                <ul className="nav navbar-nav pull-xs-right">
                    <NavItem name="Home" href="/" />
                    <NavItem name="New Post" href="/newpost" icon="ion-compose" />
                    <NavItem name="Settings" href="" icon="ion-gear-a" />
                    <NavItem name="Sign up" href="/register" />
                </ul>
            </div>
        </nav>
    );
}
