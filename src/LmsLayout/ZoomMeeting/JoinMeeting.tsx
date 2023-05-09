import React, { useState, useEffect, useRef } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
// import './Meeting.css';
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
		const zoomMeetingContainer = document.querySelector<HTMLElement>('#zoom-meeting-container');
		const zmmtgRoot = document.querySelector<HTMLElement>('#zmmtg-root');
		const videoWrap = document.querySelector<HTMLElement>('.zm-video-wrap');

		if (zmmtgRoot && videoWrap) {
			// zmmtgRoot.style.position = 'relative';
			// videoWrap.style.width = '20%';
			// videoWrap.style.height = '20%';
			// videoWrap.style.position = 'absolute';
			// videoWrap.style.top = '50%';
			// videoWrap.style.left = '50%';
			// videoWrap.style.transform = 'translate(-50%, -50%)';
		}
	}, []);

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

	const resizeMeeting = () => {
		if (meetingContainerRef.current) {
			const { clientWidth, clientHeight } = meetingContainerRef.current;
			// ZoomMtg.resize(clientWidth, clientHeight);
		}
	};

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
			<div id='zoom-meeting-container' className=''>
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
							onResize={() => resizeMeeting()}></div>
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
			</div>
		</PageWrapper>
	);
};

export default JoinMeeting;
