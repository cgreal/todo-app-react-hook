import React, { PureComponent } from 'react';
import Error from './Error';

class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    // componentDidCatch(error, info) {
    //     // Log this error to to an error reporting service
    // }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <Error type="refresh" message="Lütfen sayfayı yenilemeyi (hard refresh) deneyin." />;
        }
        return children;
    }
}

export default ErrorBoundary;
