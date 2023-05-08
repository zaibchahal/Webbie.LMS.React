import React, { useEffect } from 'react';

const TwitterCallback = ({ location }) => {
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const oauthToken = searchParams.get('oauth_token');
        const oauthVerifier = searchParams.get('oauth_verifier');

        // Use the oauthToken and oauthVerifier to exchange them for an access token and access token secret
        // You can use any HTTP library you prefer to make the API request
    }, [location]);

    return (
        <div>
            <p>Processing Twitter authentication...</p>
        </div>
    );
};

export default TwitterCallback;