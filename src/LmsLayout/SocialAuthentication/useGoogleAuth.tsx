import { useEffect, useState } from 'react';

interface UseGoogleAuthReturnType {
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

export function useGoogleAuth(): UseGoogleAuthReturnType {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		gapi.load('client:auth2', () => {
			gapi.client
				.init({
					clientId:
						'328801390833-4dfc6agjmng54gr3io8a3mqolni3kshk.apps.googleusercontent.com',
					scope: 'openid profile email',
				})
				.then(() => {
					const auth2 = (gapi as any).auth2;
					const isSignedIn = auth2.getAuthInstance().isSignedIn.get();
					console.log(isSignedIn);
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
	}, []);

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
