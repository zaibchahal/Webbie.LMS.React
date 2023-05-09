import React from 'react';
import AppleSignIn from 'apple-signin-auth';

function LoginWithAppleButton() {
    const handleAppleLogin = async () => {
        try {
            const authData = await AppleSignIn.init({
                clientId: 'your_client_id',
                redirectURI: 'your_redirect_uri',
                scope: 'email name',
            });
            console.log(authData); // handle the authentication data here
        } catch (error) {
            console.error(error); // handle the error here
        }
    };

    return (
        <button onClick={handleAppleLogin}>
            Log in with Apple
        </button>
    );
}

export default LoginWithAppleButton;