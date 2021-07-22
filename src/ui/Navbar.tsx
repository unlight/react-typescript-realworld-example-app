import React from 'react';

import { NavItem } from './NavItem';

type NavbarProps = {
    user?: { username: string };
};

export function Navbar(props: NavbarProps): JSX.Element {
    const { user } = props;
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    conduit
                </a>
                <ul className="nav navbar-nav pull-xs-right">
                    <NavItem name="Home" href="/" />
                    <NavItem name="New Post" href="/newpost" icon="ion-compose" />
                    <NavItem name="Settings" href="/settings" icon="ion-gear-a" />
                    {user ? (
                        <NavItem name={user.username} href={`@${user.username}`} />
                    ) : (
                        <NavItem name="Sign up" href="/register" />
                    )}
                </ul>
            </div>
        </nav>
    );
}
