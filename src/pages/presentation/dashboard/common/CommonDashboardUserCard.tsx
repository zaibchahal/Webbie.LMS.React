import React from 'react';
import USERS from '../../../../common/data/userSessionService';
import { demoPagesMenu } from '../../../../menu';
import UserContact from '../../../../components/UserContact';
import { useNavigate } from 'react-router-dom';

const CommonDashboardUserCard = () => {
	const navigate = useNavigate();

	return (
		<UserContact
			name={`${USERS.SAM.name} ${USERS.SAM.surname}`}
			position='Team Lead'
			mail={`${USERS.SAM.userName}@site.com`}
			phone='1234567'
			onChat={() => navigate(`../${demoPagesMenu.chat.subMenu.withListChat.path}`)}
			src={USERS.SAM.src}
			srcSet={USERS.SAM.srcSet}
			color={USERS.SAM.color}
		/>
	);
};

export default CommonDashboardUserCard;
