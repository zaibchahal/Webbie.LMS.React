import React, { SetStateAction, useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../layout/SubHeader/SubHeader';
import Button from '../../components/bootstrap/Button';
import Page from '../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
// import Chat, { ChatAvatar, ChatGroup, ChatListItem } from '../../components/Chat';
import InputGroup from '../../components/bootstrap/forms/InputGroup';
import Textarea from '../../components/bootstrap/forms/Textarea';
import USERS, { IUserProps } from '../../common/data/userSessionService';
import Icon from '../../components/icon/Icon';
import ThemeContext from '../../contexts/themeContext';
import { demoPagesMenu } from '../../menu';
import CHATS, { IMessages } from '../../common/data/chatDummyData';
import CommonChatStatus from '../../pages/_common/CommonChatStatus';
import LmsChat, { IGroupMessages } from '../../common/LmsData/LmsGroupChatData';
import Chat, { ChatAvatar, ChatGroup } from '../../common/LMS_Common/LmsChat';
import {
	HubConnection,
	HubConnectionBuilder,
	HttpTransportType,
	LogLevel,
	HubConnectionState,
} from '@microsoft/signalr';
import { API_BASE_URL, AppConst, BASE_URL } from '../../common/data/constants';
import { getCookie } from '../../common/data/helper';
import AuthContext from '../../contexts/authContext';
import Badge from '../../components/bootstrap/Badge';
import useDarkMode from '../../hooks/useDarkMode';

const LiveClassPage = () => {
	const navigate = useNavigate();

	const TABS: { [key: string]: IUserProps } = {
		CHLOE: USERS.CHLOE,
		GRACE: USERS.GRACE,
		JANE: USERS.JANE,
		RYAN: USERS.RYAN,
		ELLA: USERS.ELLA,
		SAM: USERS.SAM,
	};

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

	const registerChatEvents = (connection: any) => {
		connection.on('getChatMessage', function (message: any) {
			// Mesage received here
		});
		connection.on('getUserConnectNotification', function (friend: any, isConnected: any) {
			// Connection status hereF
		});

		connection.on('getUserStateChange', function (friend: any, state: any) {
			// User state here
		});
	};

	const [messageValue, setMessageValue] = useState('');
	const successfull = () => {
		return console.log('Message Send Successfully');
		setMessageValue('');
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
		<PageWrapper title='Live Class'>
			{/* <SubHeader>
				<></>
			</SubHeader> */}
			<Page>
				<div className='d-flex justify-content-start my-3'>
					<span className='ps-2'>
						<h3>
							{/* <Icon className='mx-2' icon='Verified' color='info' /> */}
							Title Of Live Class
						</h3>
						<div className='col-auto mt-0 pt-0'>
							<Badge color={darkModeStatus ? 'light' : 'dark'} isLight>
								<span style={{ marginRight: '10px' }}>
									<Icon
										style={{
											fontSize: 'calc(1vh + 1vw)',
										}}
										className='fw-bold mx-1'
										icon='Photo_camera_front'
									/>
									Dr. Faisal Maqsood
								</span>
								<span>
									<Icon
										style={{
											fontSize: 'calc(1vh + 1vw)',
										}}
										className='fw-bold mx-1'
										icon='AlarmOn'
									/>
									34 Mins
								</span>
							</Badge>
						</div>
					</span>
				</div>

				<div className='row h-100'>
					{
						<div className='col-lg-6 col-md-6'>
							<Card stretch className='overflow-hidden'>
								<CardBody isScrollable className='p-0'>
									<></>
								</CardBody>
								<CardFooter>
									<></>
								</CardFooter>
							</Card>
						</div>
					}

					{
						<div className='col-lg-6 col-md-6'>
							<Card stretch>
								<CardHeader>
									<CardActions>
										<div className='d-flex align-items-center'>
											<ChatAvatar
												// eslint-disable-next-line react/jsx-props-no-spreading
												// {...activeTab}
												className='me-3'
											/>
											<div className='fw-bold'>Group Chat</div>
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
					}
				</div>
				<div className='d-flex justify-content-center my-3'>
					<span className='ps-2'>
						<h3>
							<Icon className='mx-2' icon='Verified' color='info' />
							Study Material
						</h3>
					</span>
				</div>
				<div className='d-flex justify-content-center'>
					<div className='col col-8'>
						<Card stretch>
							<CardBody>
								{[1, 2, 3].map((item: any, index: any) => (
									<div className='d-flex justify-content-between py-2 align-items-center'>
										<span className='fs-5'>
											<Icon
												className='mx-2'
												icon='PictureAsPdf'
												color='info'
											/>
											PDF Name Here
										</span>
										<Button
											color='info'
											icon='CloudDownload'
											isLight
											tag='a'
											to='/somefile.txt'
											target='_blank'
											download>
											Export
										</Button>
									</div>
								))}
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default LiveClassPage;
