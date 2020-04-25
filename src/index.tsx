import * as React from 'react';
import * as ReactDOM from 'react-dom';

function render() {
    const { App } = require('./app/app.component');
    ReactDOM.render(<App />, document.querySelector('#main'));
}

render();

// Hot Module Replacement API.
if (module.hot) {
    module.hot.accept('./app/app', render);
}
