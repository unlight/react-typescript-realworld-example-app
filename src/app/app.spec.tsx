import { render } from '@testing-library/react';
import React from 'react';

import { App } from './app';

it('smoke', () => {
    const { container } = render(<App></App>);
    expect(container).toBeTruthy();
});
