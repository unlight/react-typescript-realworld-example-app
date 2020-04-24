import * as React from 'react';
import * as ReactDOM from 'react-dom';

function render() {
    const { App } = require('./app/app');
    const appElement = <App />;
    ReactDOM.render(appElement, document.getElementById('main'));
}

render();

// Hot Module Replacement API.
if (module.hot) {
    module.hot.accept('./app/app', render);
}
