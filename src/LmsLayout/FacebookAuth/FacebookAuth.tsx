import React, { useEffect, useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import Button from '../../components/bootstrap/Button';

declare global {
	interface Window {
		fbAsyncInit: () => void;
		FB: any;
	}
}
const FacebookAuth: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		window.fbAsyncInit = () => {
			window.FB.init({
				appId: 'your-app-id',
				cookie: true,
				xfbml: true,
				version: 'v10.0',
			});
			window.FB.AppEvents.logPageView();
		};

		(function (d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js');
			fjs.parentNode?.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');
	}, []);

	const handleLogin = () => {
		window.FB.login((response: any) => {
			if (response.status === 'connected') {
				setIsLoggedIn(true);
			} else {
				console.log('There was a problem logging you in.');
			}
		});
	};

	const handleLogout = () => {
		window.FB.logout(() => {
			setIsLoggedIn(false);
			console.log('You are now logged out.');
		});
	};

	return (
		<div>
			{isLoggedIn ? (
				<Button
					color='primary'
					isLight
					className='btn-lg w-100 mb-3 d-flex align-items-center'
					onClick={handleLogout}>
					<FaFacebook className='me-2' fontSize={20} />
					Log Out
				</Button>
			) : (
				<Button
					color='primary'
					isLight
					className='btn-lg w-100 mb-3 d-flex align-items-center'
					onClick={handleLogin}>
					<FaFacebook className='me-2' fontSize={20} />
					Log In with Facebook
				</Button>
			)}
		</div>
	);
};

export default FacebookAuth;
