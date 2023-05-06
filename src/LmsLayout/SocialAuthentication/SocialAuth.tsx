import React from 'react';
import Button from '../../components/bootstrap/Button';
import { FaFacebook, FaGoogle, FaMicrosoft, FaTwitter } from 'react-icons/fa';
import { useGoogleAuth } from './useGoogleAuth';

const SocialAuth = () => {
	const { isSignedIn, signIn, signOut } = useGoogleAuth();

	const handleSignInClick = async () => {
		await signIn();
	};

	const handleSignOutClick = async () => {
		await signOut();
	};

	return (
		<>
			<div className='container mb-3'>
				<h2 className='text-center mb-4'>Sign in with social media</h2>
				<div className='row justify-content-center'>
					<div className='col-md-6'>
						{/* <GoogleLoginButton
							className=' d-flex align-items-center rounded-3'
							onClick={() => handleSocialLogin('google')}
						/> */}
						<div>
							{isSignedIn ? (
								<Button
									color='primary'
									isLight
									// icon='Google'
									onClick={handleSignOutClick}
									className='btn-lg w-100 mb-3 d-flex align-items-center'>
									<FaGoogle className='me-2' fontSize={20} />
									Sign Out
								</Button>
							) : (
								<Button
									color='primary'
									isLight
									onClick={handleSignInClick}
									className='btn-lg w-100 mb-3 d-flex align-items-center'>
									<FaGoogle className='me-2' fontSize={20} />
									Sign In with Google
								</Button>
							)}
						</div>
					</div>
					<div className='col-md-6'>
						<Button
							color='primary'
							isLight
							className='btn-lg w-100 mb-3 d-flex align-items-center'>
							<FaFacebook className='me-2' fontSize={20} />
							Sign in with Facebook
						</Button>
					</div>
					<div className='col-md-6'>
						<Button
							color='primary'
							isLight
							className='btn-lg w-100 mb-3 d-flex align-items-center'>
							<FaTwitter className='me-2' fontSize={20} />
							Sign in with Twitter
						</Button>
					</div>
					<div className='col-md-6'>
						<Button
							color='primary'
							isLight
							className='btn-lg w-100 mb-3 d-flex align-items-center'>
							<FaMicrosoft className='me-2' fontSize={20} />
							Sign in with GitHub
						</Button>
					</div>
				</div>
			</div>
			<div className='row g-4 d-flex justify-content-end'>
				<Button
					color='primary'
					isLight
					icon='PublishedWithChanges'
					className='px-5'
					style={{ maxWidth: 'max-content' }}
					// onClick={() => setPasswordChangeCTA(true)}
				>
					Authentication
				</Button>
			</div>
		</>
	);
};

export default SocialAuth;
