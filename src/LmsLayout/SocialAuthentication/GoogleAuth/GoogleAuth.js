import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Button from '../../../components/bootstrap/Button';
import { FaGoogle } from 'react-icons/fa';

const GoogleAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const onSuccess = (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        setLoggedIn(true);
    };

    const onFailure = (error) => {
        console.error(error);
    };
    const signOut = () => {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
    var isLoggedIn = localStorage.getItem('accessToken');

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <button onClick={() => signOut()}>signOut</button>
                </>
            ) : (
                <GoogleLogin
                    clientId="910444537344-mu95pf7nm7j2e5l2kp2g8ri2bi00jjj9.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={onSuccess}
                    className=''
                    onFailure={onFailure}
                    render={renderProps => (
                        <div>
                            <Button
                                color='primary'
                                onClick={renderProps.onClick}
                                className='btn-lg w-100 mb-3 d-flex align-items-center'
                                isLight
                            >
                                <FaGoogle className='me-2' fontSize={20} />
                                Sign in with Microsoft
                            </Button>
                        </div>
                    )}
                    cookiePolicy={'single_host_origin'}
                    scope='openid profile email'
                />
            )}
        </div>
    );
};

export default GoogleAuth;