import React, { useState } from 'react';
import Button, { ButtonGroup } from '../../components/bootstrap/Button';

interface IStatus {
	[key: string]: 'Online' | "Don't Disturb" | 'Offline' | 'Invisible';
}
const ChatStatusBar = () => {
	const STATUS: IStatus = {
		ONLINE: 'Online',
		DONT_DISTURB: "Don't Disturb",
		OFFLINE: 'Offline',
		INVISIBLE: 'Invisible',
	};
	const [status, setStatus] = useState<IStatus['key']>(STATUS.ONLINE);
	return (
		<ButtonGroup className='w-75 mb-3 align-items-cdenter bg-light'>
			<Button isDisable color='dark' isLight>
				Status:
			</Button>
			<Button
				icon='AccountCircle'
				color={status === STATUS.ONLINE ? 'success' : 'dark'}
				isLight={status !== STATUS.ONLINE}
				onClick={() => setStatus(STATUS.ONLINE)}>
				<br />
				Visibility
			</Button>

			<Button
				icon='DarkMode'
				color={status === STATUS.DONT_DISTURB ? 'warning' : 'dark'}
				isLight={status !== STATUS.DONT_DISTURB}
				onClick={() => setStatus(STATUS.DONT_DISTURB)}>
				<br />
				Away
			</Button>
			<Button
				icon='NoAccounts'
				color={status === STATUS.OFFLINE ? 'danger' : 'dark'}
				isLight={status !== STATUS.OFFLINE}
				onClick={() => setStatus(STATUS.OFFLINE)}>
				<br />
				Don't Disturb
			</Button>
			<Button
				icon='VisibilityOff'
				color={status === STATUS.INVISIBLE ? 'info' : 'dark'}
				isLight={status !== STATUS.INVISIBLE}
				onClick={() => setStatus(STATUS.INVISIBLE)}>
				<br />
				Invisible
			</Button>
		</ButtonGroup>
	);
};

export default ChatStatusBar;
