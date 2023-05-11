import React from 'react';
import AuthContext from './authContext';

export function withAuth(Component: React.ComponentType<any>) {
    return function AuthComponent(props: any) {
        return (
            <AuthContext.Consumer>
                {(authProps) => <Component {...props} auth={authProps} />}
            </AuthContext.Consumer>
        );
    };
}

