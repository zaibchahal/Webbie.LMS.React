import { useEffect, useState } from 'react';

interface UseGoogleAuthReturn {
	isSignedIn: boolean;
	signIn: () => Promise<void>;
	signOut: () => Promise<void>;
}

declare const gapi: any;

interface Profile {
	name: string;
	email: string;
	imageUrl: string;
}

export function useGoogleAuth(): UseGoogleAuthReturn {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://apis.google.com/js/api.js';
		gapi.load('client:auth2', () => {
			gapi.client
				.init({
					clientId:
						'910444537344-mu95pf7nm7j2e5l2kp2g8ri2bi00jjj9.apps.googleusercontent.com',
					scope: 'openid profile email',
				})
				.then(() => {
					const auth2 = (gapi as any).auth2;
					const isSignedIn = auth2.getAuthInstance().isSignedIn.get();
					const currentUser = auth2.getAuthInstance().currentUser.get();
					const userProfile = currentUser.getBasicProfile();
					setIsSignedIn(!isSignedIn);
					setProfile({
						name: userProfile.getName(),
						email: userProfile.getEmail(),
						imageUrl: userProfile.getImageUrl(),
					});
					console.log(profile?.name);
				});
		});
	});

	const loadClient = (): Promise<void> => {
		return new Promise((resolve, reject) => {
			gapi.load('client:auth2', {
				callback: resolve,
				onerror: reject,
			});
		});
	};

	const signIn = async (): Promise<void> => {
		await loadClient();
		const auth2 = (gapi as any).auth2;
		await auth2.getAuthInstance().signIn();
		setIsSignedIn(true);
	};

	const signOut = async (): Promise<void> => {
		const auth2 = (gapi as any).auth2;
		await auth2.getAuthInstance().signOut();
		setIsSignedIn(false);
	};

	return {
		isSignedIn,
		signIn,
		signOut,
	};
}
