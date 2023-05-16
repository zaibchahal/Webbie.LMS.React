import dayjs from 'dayjs';
import USERS, { IUserProps } from './userSessionService';
import SERVICES, { IServiceProps } from './serviceDummyData';

export interface IEvents extends Partial<IServiceProps> {
	id?: number;
	start?: Date;
	end?: Date;
	user?: IUserProps;
	[key: string]: any;
}
const events: IEvents[] = [
	{
		id: 16,
		start: dayjs().startOf('month').add(5, 'day').startOf('day').add(10, 'hour').toDate(),
		end: dayjs().startOf('month').add(5, 'day').startOf('day').add(12, 'hour').toDate(),
		...SERVICES.KAYAKING,
	},
];

export default events;
