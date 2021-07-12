import React from 'react';
import { NavItem } from './NavItem';

export function Navbar(): JSX.Element {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="index.html">
                    conduit
                </a>
                <ul className="nav navbar-nav pull-xs-right">
                    <NavItem name="Home" href="/" active />
                    <NavItem name="New Post" href="" icon="ion-compose" />
                    <NavItem name="Settings" href="" icon="ion-gear-a" />
                    <NavItem name="Sign up" href="/register" />
                </ul>
            </div>
        </nav>
    );
}
