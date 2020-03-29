import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from "../components/common/Loading";
import ErrorBoundary from '../components/common/ErrorBoundary';
import Error from '../components/common/Error';
import routes from './Routes';

function Root( ) {

    return (
	    <>
		    <div className="App">
			    <BrowserRouter>
				    <main className="main container">
					    <Suspense fallback={<Loading />}>
						    <Switch>
							    {routes.map(({ path, Component }) => {
								    return (
									    <Route
										    key={path}
										    exact
										    path={path}
										    render={() => (
											    <ErrorBoundary>
												    <Component />
											    </ErrorBoundary>
										    )}
									    />
								    );
							    })}
							    <Route render={() => <Error statusCode={404} type="error404" />} />
						    </Switch>
					    </Suspense>
				    </main>
			    </BrowserRouter>
		    </div>
	    </>
    );
}


export default Root;
