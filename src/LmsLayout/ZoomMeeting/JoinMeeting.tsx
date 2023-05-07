import React, { useState, useEffect, useRef } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import './Meeting.css';
import { useLocation } from 'react-router-dom';

const JoinMeeting = () => {
	const [meetingStarted, setMeetingStarted] = useState(true);
	const meetingContainerRef = useRef(null);
	const location = useLocation();

	const meetingConfig = {
		sdkKey: 'IyA_w7zCSkKe15hiqpKj-g',
		sdkSecret: 'ZEIcbLDrH1xJ1wWNJEsJvqmdR5coLrMZTHb1',
		meetingNumber: '123',
		userName: 'Jone Doa',
		passWord: '123',
		leaveUrl: 'http://localhost:3000/live-courses',
		role: '0',
	};

	useEffect(() => {
		ZoomMtg.setZoomJSLib('https://source.zoom.us/2.12.0/lib', '/av');
		ZoomMtg.preLoadWasm();
		ZoomMtg.prepareWebSDK();

		joinMeeting();
	});

	const joinMeeting = () => {
		ZoomMtg.generateSDKSignature({
			meetingNumber: meetingConfig.meetingNumber,
			sdkKey: meetingConfig.sdkKey,
			sdkSecret: meetingConfig.sdkSecret,
			role: meetingConfig.role,
			success: (res: any) => {
				console.log('Signature:', res.result);
				startMeeting(res.result);
			},
			error: (err: any) => {
				console.error('Generate signature error:', err);
			},
		});
	};

	const startMeeting = (signature: any) => {
		ZoomMtg.init({
			leaveUrl: meetingConfig.leaveUrl,
			isSupportAV: true,
			success: () => {
				setMeetingStarted(true);
				ZoomMtg.join({
					meetingNumber: meetingConfig.meetingNumber,
					userName: meetingConfig.userName,
					signature: signature,
					sdkKey: meetingConfig.sdkKey,
					passWord: meetingConfig.passWord,
					success: (res: any) => {
						console.log('Join meeting success:', res);
					},
					error: (err: any) => {
						console.error('Join meeting error:', err);
					},
				});
			},
			error: (err: any) => {
				console.error('ZoomMtg.init() error:', err);
			},
		});
	};

	// const resizeMeeting = () => {
	// 	if (meetingContainerRef.current) {
	// 		const { clientWidth, clientHeight } = meetingContainerRef.current;
	// 		// ZoomMtg.resize(clientWidth, clientHeight);
	// 	}
	// };

	useEffect(() => {
		// ZoomMtg.leaveMeeting({
		// 	confirm: true,
		// 	success: function () {
		// 		console.log('Leave meeting success');
		// 	},
		// 	error: function (res: any) {
		// 		console.log(res);
		// 	},
		// });
		setMeetingStarted(false);
	}, [location.pathname]);

	return (
		<PageWrapper title='Zoom Meeting'>
			{meetingStarted ? (
				<div
					style={{
						width: '100%',
						height: 'calc(100vh - 60px)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<div
						style={{
							width: '80%',
							height: '80%',
							border: '1px solid black',
							borderRadius: '10px',
						}}
						ref={meetingContainerRef}
						// onResize={() => resizeMeeting()}
						></div>
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: 'calc(30vh - 30px)',
					}}></div>
			)}
		</PageWrapper>
	);
};

export default JoinMeeting;
