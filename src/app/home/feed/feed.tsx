import React from 'react';

import { NavItem } from './nav-item';

export function Feed() {
    return (
        <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
                <NavItem />
                <NavItem />
            </ul>
        </div>
    );
}
