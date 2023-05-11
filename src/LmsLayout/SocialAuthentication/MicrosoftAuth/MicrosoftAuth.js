import React from 'react';
import { msalInstance } from './authInstance';
import Button from '../../../components/bootstrap/Button';
import { FaMicrosoft } from 'react-icons/fa';
import '../Auth.css'


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
    <Button
      color='primary'
      isLight
      className='btn-lg w-100 mb-3 d-flex align-items-center'
      onClick={handleLogin}
    >
      <FaMicrosoft className='me-2' fontSize={20} />
      Sign in with Microsoft
    </Button>

    // <button id="microsoft-login-button" className="login-button"
    //   onClick={handleLogin}
    // >
    //   <FaMicrosoft className='me-2' fontSize={20} />
    //   <span class="button-text">Sign in with Microsoft</span>
    // </button>
  );
}

export default MicrosoftAuth;