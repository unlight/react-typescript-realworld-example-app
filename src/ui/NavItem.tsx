import React from 'react';

export function NavItem(props: {
    name: string;
    href: string;
    icon?: string;
    active?: boolean;
}) {
    const { name, href, icon, active } = props;

    return (
        <li className="nav-item">
            <a className={`nav-link${active ? ' active' : ''}`} href={href}>
                {icon && [<i className={icon} key={icon}></i>, ' ']}
                {name}
            </a>
        </li>
    );
}
