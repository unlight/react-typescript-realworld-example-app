import React from 'react';

export function Pagination() {
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item active">
          <a className="page-link" href="">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="">
            2
          </a>
        </li>
      </ul>
    </nav>
  );
}
