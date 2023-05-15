import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/bootstrap/Button';
import Page from '../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
} from '../../components/bootstrap/Card';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import InputGroup from '../../components/bootstrap/forms/InputGroup';
import Textarea from '../../components/bootstrap/forms/Textarea';
import USERS, { IUserProps } from '../../common/data/userSessionService';
import LmsChat, { IGroupMessages } from '../../common/LmsData/LmsGroupChatData';
import Chat, { ChatAvatar, ChatGroup } from '../../common/LMS_Common/LmsChat';
import {
	HubConnection,
	HubConnectionBuilder,
	HttpTransportType,
	LogLevel,
	HubConnectionState,
} from '@microsoft/signalr';
import { AppConst, BASE_URL } from '../../common/data/constants';
import { getCookie } from '../../common/data/helper';
import AuthContext from '../../contexts/authContext';
import useDarkMode from '../../hooks/useDarkMode';

const TicketChat = () => {
	function getMessages(): IGroupMessages[] | null {
		if (LmsChat.Group_Chat_Dummy_Data) {
			return LmsChat.Group_Chat_Dummy_Data;
		}
		return null;
	}

	const [connection, setConnection] = useState<HubConnection>();

	useEffect(() => {
		const hubConn = new HubConnectionBuilder()
			.configureLogging(LogLevel.Debug)
			.withUrl(`${BASE_URL}/signalr-chat`, {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.build();

		setConnection(hubConn);
	}, []);

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then((result) => {
					connection.on('OnEventCreated', (events) => {
						console.log({ result });
					});
				})
				.catch((e) => console.log('Connection failed: ', e));
		}
	}, [connection]);

	const [messageValue, setMessageValue] = useState('');
	const successfull = () => {
		setMessageValue('');
		return console.log('Message Send Successfully');
	};

	const { session } = useContext(AuthContext);

	const sendMessage = (messageData: any, callback: any) => {
		if (!connection || connection.state !== HubConnectionState.Connected) {
			callback && callback();
			return;
		}
		console.log(getCookie(AppConst.TenantID));
		connection
			.invoke('sendMessage', {
				tenantId: getCookie(AppConst.TenantID),
				userId: session?.userId,
				chatGroupId: 1,
				message: messageData,
				tenancyName: getCookie(AppConst.TenantName),
				userName: '',
				profilePictureId: 12,
			})
			.then(function (result) {
				if (result) {
					console.log(result);
					setMessageValue('');
				}
				callback && callback();
			})
			.catch(function (error) {
				setMessageValue('');

				console.error('Error sending message:', error);
			});
	};
	const { darkModeStatus } = useDarkMode();

	return (
		<PageWrapper title='Ticket Chat'>
			<Page>
				<div className='row h-100 d-flex justify-content-center'>
					<div className='col-lg-10 col-md-12'>
						<Card stretch>
							<CardHeader>
								<CardActions>
									<div className='d-flex align-items-center'>
										<ChatAvatar
											// eslint-disable-next-line react/jsx-props-no-spreading
											// {...activeTab}
											className='me-3'
										/>
										<div className='fw-bold'>Support Chat</div>
									</div>
								</CardActions>
							</CardHeader>
							<CardBody isScrollable>
								<Chat>
									{getMessages()?.map((msg) => (
										<>
											<ChatGroup
												key={String(msg.messages)}
												user={msg.user}
												isReply={msg.isReply}
												messages={msg.messages}
											/>
										</>
									))}
								</Chat>
							</CardBody>
							<CardFooter className='d-block'>
								<InputGroup>
									<Textarea
										title='Message'
										placeholder='Write Your Message'
										value={messageValue}
										onChange={(e: any) => {
											setMessageValue(e.target.value);
										}}
									/>
									<Button
										color='info'
										icon='Send'
										onClick={() => {
											return sendMessage(messageValue, successfull);
										}}>
										SEND
									</Button>
								</InputGroup>
							</CardFooter>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default TicketChat;
