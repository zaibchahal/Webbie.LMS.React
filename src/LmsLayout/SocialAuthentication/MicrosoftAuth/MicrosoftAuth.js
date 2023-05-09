import React from 'react';
import { msalInstance } from './authInstance';
import Button from '../../../components/bootstrap/Button';
import { FaMicrosoft } from 'react-icons/fa';


const MicrosoftAuth = () => {

  const handleLogin = () => {
    msalInstance.loginPopup()
      .then(response => {
        console.log('Login success', response);
        // handle successful login
      })
      .catch(error => {
        console.error('Login error', error);
        // handle login error
      });
  }
  return (
    // <button onClick={handleLogin}>Login with Microsoft</button>
    <Button
      color='primary'
      isLight
      className='btn-lg w-100 mb-3 d-flex align-items-center'
      onClick={handleLogin}
    >
      <FaMicrosoft className='me-2' fontSize={20} />
      Sign in with Microsoft
    </Button>
  );
}

export default MicrosoftAuth;