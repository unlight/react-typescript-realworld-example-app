import React from 'react';
import { NavLink } from 'react-router-dom';

export function NavItem(props: {
  name: string;
  href: string;
  icon?: string;
}): JSX.Element {
  const { name, href, icon } = props;

  return (
    <li className="nav-item">
      <NavLink to={href} className="nav-link">
        {icon && [<i className={icon} key={icon}></i>, ' ']}
        {name}
      </NavLink>
    </li>
  );
}
