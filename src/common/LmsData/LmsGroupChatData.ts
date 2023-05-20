import { IMessages } from '../data/chatDummyData';
import USERS, { IUserProps } from '../data/userSessionService';

export interface IGroupMessages {
	id: number;
	messages: { id: number; message: string; user: IUserProps }[];
	user: IUserProps;
	isReply?: boolean;
}
export const GroupChatDummyData: IGroupMessages[] = [
	{
		id: 1,
		messages: [
			{
				id: 1,
				message: 'Has everyone screened the new edit? Any thoughts?',
				user: USERS.CHLOE,
			},
		],
		user: USERS.CHLOE,
	},
	{
		id: 2,
		messages: [
			{
				id: 2,
				message: 'Yes',
				user: USERS.JOHN,
			},
		],
		user: USERS.JOHN,
		isReply: true,
	},
	{
		id: 3,
		messages: [
			{
				id: 3,
				message: 'Yes, honey',
				user: USERS.GRACE,
			},
		],
		user: USERS.GRACE,
		isReply: true,
	},
	{
		id: 1,
		messages: [
			{
				id: 4,
				message: 'Yes, honey',
				user: USERS.CHLOE,
			},
		],
		user: USERS.CHLOE,
	},
];

const LmsChat: { [key: string]: IGroupMessages[] } = {
	GroupChatDummyData,
};

export default LmsChat;
