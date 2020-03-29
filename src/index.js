import 'react-app-polyfill/stable';
import 'formdata-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './core/Root';
import './assets/styles/bootstrap-grid.scss'; // Import Bootstrap Grid's
import './assets/styles/global.scss';

window.dataLayer = window.dataLayer || [];

if (window.top !== window.self) {
	window.top.location.replace(window.self.location.href);
} else {
	ReactDOM.render(
		<Root />,
		document.getElementById('root')
	);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
