import { render } from '@testing-library/react';
import React from 'react';

import { App } from './app.component';

it('smoke', () => {
    const { container } = render(<App></App>);
    expect(container).toBeTruthy();
});
