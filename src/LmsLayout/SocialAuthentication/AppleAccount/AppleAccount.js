import React, { useState } from 'react';
import { FaApple } from 'react-icons/fa';
import Button from '../../../components/bootstrap/Button';
import AppleSignIn from 'apple-signin-auth';


function LoginWithAppleButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleLogin = async () => {
    try {
      // Initialize the Apple Sign In API
      await AppleSignIn.init({
        clientId: 'your_client_id',
        redirectURI: 'your_redirect_uri',
        scope: 'email name profile',
      });

      // Sign in with Apple
      const authData = await AppleSignIn.signIn();
      console.log(authData); // handle the authentication data here
    } catch (error) {
      console.error(error); // handle the error here
    }
  };
  return (
    <Button
      color='primary'
      isLight
      className='btn-lg w-100 mb-3 d-flex align-items-center'
      onClick={handleAppleLogin}
      disabled={isLoading}
    >
      <FaApple className='me-2' fontSize={20} />
      Sign in with Apple
    </Button>
  );
}

export default LoginWithAppleButton;