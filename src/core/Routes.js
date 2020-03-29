import { lazy } from 'react';

const Homepage = lazy(() => import('../screens/Homepage'));

const routes = [
	{
		path: '/',
		Component: Homepage
	}
];

export default routes;
