import React, { FC, HTMLAttributes, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import USERS from '../../common/data/userSessionService';
import CommonAvatarTeam from '../../common/other/CommonAvatarTeam';
import Avatar, { AvatarGroup } from '../../components/Avatar';
import Card, {
	CardHeader,
	CardLabel,
	CardTitle,
	CardSubTitle,
	CardActions,
	CardBody,
} from '../../components/bootstrap/Card';
import Progress from '../../components/bootstrap/Progress';
import Icon from '../../components/icon/Icon';
import Badge from '../../components/bootstrap/Badge';
import useDarkMode from '../../hooks/useDarkMode';
import useTourStep from '../../hooks/useTourStep';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubheaderSeparator,
	SubHeaderRight,
} from '../../layout/SubHeader/SubHeader';
import { demoPagesMenu } from '../../menu';

interface IItemProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
	teamName: string;
	NumberOfLectures: number;
	CourseHour: number;
	CourseMinute: number;
	percent: number;
	dueDate: string;
}
const Item: FC<IItemProps> = ({
	name,
	teamName,
	NumberOfLectures,
	CourseMinute,
	CourseHour,
	percent,
	dueDate,
	...props
}) => {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const handleOnClickToProjectPage = useCallback(
		() => navigate(`../courses-page`),
		[navigate],
	);
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className='col-md-4' {...props}>
			<Card stretch onClick={handleOnClickToProjectPage} className='cursor-pointer'>
				<CardHeader>
					<CardLabel icon='Ballot'>
						<CardTitle>{name}</CardTitle>
						<CardSubTitle>{teamName}</CardSubTitle>
					</CardLabel>
					<CardActions>
						<small className='text-center d-flex border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
							{dueDate}
						</small>
					</CardActions>
				</CardHeader>
				<CardBody>
					<div className='row g-2 mb-3'>
						<div className='col-auto'>
							<Badge color={darkModeStatus ? 'light' : 'dark'} isLight>
								<Icon
									style={{
										fontSize: 'calc(1vh + 1vw)',
									}}
									className='fw-bold'
									icon='AlarmOn'
								/>
								{CourseHour} Hrs, {CourseMinute} Mins
							</Badge>
						</div>
						<div className='col-auto'>
							<Badge color={darkModeStatus ? 'light' : 'dark'} isLight>
								<Icon
									style={{
										fontSize: 'calc(1vh + 1vw)',
									}}
									icon='SlowMotionVideo'
								/>
								Lecture({NumberOfLectures})
							</Badge>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							{percent}%
							<Progress isAutoColor value={percent} height={10} />
						</div>
						<div className='col-md-6 d-flex justify-content-end'>
							<AvatarGroup>
								<Avatar
									srcSet={USERS.GRACE.srcSet}
									src={USERS.GRACE.src}
									userName={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
									color={USERS.GRACE.color}
								/>
								<Avatar
									srcSet={USERS.SAM.srcSet}
									src={USERS.SAM.src}
									userName={`${USERS.SAM.name} ${USERS.SAM.surname}`}
									color={USERS.SAM.color}
								/>
								<Avatar
									srcSet={USERS.CHLOE.srcSet}
									src={USERS.CHLOE.src}
									userName={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
									color={USERS.CHLOE.color}
								/>

								<Avatar
									srcSet={USERS.JANE.srcSet}
									src={USERS.JANE.src}
									userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
									color={USERS.JANE.color}
								/>
								<Avatar
									srcSet={USERS.JOHN.srcSet}
									src={USERS.JOHN.src}
									userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
									color={USERS.JOHN.color}
								/>
								<Avatar
									srcSet={USERS.RYAN.srcSet}
									src={USERS.RYAN.src}
									userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
									color={USERS.RYAN.color}
								/>
							</AvatarGroup>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

const ProjectManagementsList = () => {
	useTourStep(12);

	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const handleOnClickToEmployeeListPage = useCallback(
		() => navigate(`../${demoPagesMenu.appointment.subMenu.employeeList.path}`),
		[navigate],
	);

	return (
		<PageWrapper title={demoPagesMenu.projectManagement.subMenu.list.text}>
			<SubHeader>
				<SubHeaderLeft>
					<strong className='fs-5'>Hi John</strong>
					<SubheaderSeparator />
					<span>
						There are{' '}
						<Badge color='info' isLight>
							2 teams
						</Badge>{' '}
						you are in and{' '}
						<Badge color='success' isLight>
							5 projects
						</Badge>
						.
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>Facit</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				{/* <div className='row'>
					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>Teams</div>
					</div>
					<div className='col-md-4'>
						<Card stretch>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle tag='h4' className='h5'>
										Marketing Team
									</CardTitle>
									<CardSubTitle tag='h5' className='h6 text-muted'>
										There is a meeting at 12 o'clock.
									</CardSubTitle>
								</CardLabel>
								<CardActions>
									<Button
										icon='ArrowForwardIos'
										aria-label='Read More'
										hoverShadow='default'
										color={darkModeStatus ? 'dark' : undefined}
										onClick={handleOnClickToEmployeeListPage}
									/>
								</CardActions>
							</CardHeader>
							<CardBody>
								<AvatarGroup>
									<Avatar
										srcSet={USERS.GRACE.srcSet}
										src={USERS.GRACE.src}
										userName={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
										color={USERS.GRACE.color}
									/>
									<Avatar
										srcSet={USERS.SAM.srcSet}
										src={USERS.SAM.src}
										userName={`${USERS.SAM.name} ${USERS.SAM.surname}`}
										color={USERS.SAM.color}
									/>
									<Avatar
										srcSet={USERS.CHLOE.srcSet}
										src={USERS.CHLOE.src}
										userName={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
										color={USERS.CHLOE.color}
									/>

									<Avatar
										srcSet={USERS.JANE.srcSet}
										src={USERS.JANE.src}
										userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
										color={USERS.JANE.color}
									/>
									<Avatar
										srcSet={USERS.JOHN.srcSet}
										src={USERS.JOHN.src}
										userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
										color={USERS.JOHN.color}
									/>
									<Avatar
										srcSet={USERS.RYAN.srcSet}
										src={USERS.RYAN.src}
										userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
										color={USERS.RYAN.color}
									/>
								</AvatarGroup>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-4'>
						<Card stretch>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle tag='h4' className='h5'>
										Marketing Team
									</CardTitle>
									<CardSubTitle tag='h5' className='h6 text-muted'>
										There is a meeting at 12 o'clock.
									</CardSubTitle>
								</CardLabel>
								<CardActions>
									<Button
										icon='ArrowForwardIos'
										aria-label='Read More'
										hoverShadow='default'
										color={darkModeStatus ? 'dark' : undefined}
										onClick={handleOnClickToEmployeeListPage}
									/>
								</CardActions>
							</CardHeader>
							<CardBody>
								<AvatarGroup>
									<Avatar
										srcSet={USERS.GRACE.srcSet}
										src={USERS.GRACE.src}
										userName={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
										color={USERS.GRACE.color}
									/>
									<Avatar
										srcSet={USERS.SAM.srcSet}
										src={USERS.SAM.src}
										userName={`${USERS.SAM.name} ${USERS.SAM.surname}`}
										color={USERS.SAM.color}
									/>
									<Avatar
										srcSet={USERS.CHLOE.srcSet}
										src={USERS.CHLOE.src}
										userName={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
										color={USERS.CHLOE.color}
									/>

									<Avatar
										srcSet={USERS.JANE.srcSet}
										src={USERS.JANE.src}
										userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
										color={USERS.JANE.color}
									/>
									<Avatar
										srcSet={USERS.JOHN.srcSet}
										src={USERS.JOHN.src}
										userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
										color={USERS.JOHN.color}
									/>
									<Avatar
										srcSet={USERS.RYAN.srcSet}
										src={USERS.RYAN.src}
										userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
										color={USERS.RYAN.color}
									/>
								</AvatarGroup>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-4'>
						<Card stretch>
							<CardBody className='d-flex align-items-center justify-content-center'>
								<Button
									color='info'
									size='lg'
									isLight
									className='w-100 h-100'
									icon='AddCircle'>
									Add New
								</Button>
							</CardBody>
						</Card>
					</div>
				</div> */}
				<div className='row mt-3'>
					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>My Courses</div>
					</div>
					<Item
						name='BRS Physiology'
						teamName='Biology'
						dueDate='3 days left'
						NumberOfLectures={6}
						CourseHour={47}
						percent={65}
						data-tour='project-item'
						CourseMinute={456}
					/>
					<Item
						name='Obstetrics & Gynecology'
						teamName='Chamistory'
						dueDate='14 days left'
						NumberOfLectures={1}
						CourseHour={25}
						percent={70}
						CourseMinute={40}
					/>
					<Item
						name='GENERAL PATHOLOGY'
						teamName='PATHOLOGY'
						dueDate='14 days left'
						NumberOfLectures={12}
						CourseHour={34}
						percent={78}
						CourseMinute={40}
					/>
					<Item
						name='COVID - 19 VIDEO LECTURES'
						teamName='COVID'
						dueDate='21 days left'
						NumberOfLectures={4}
						CourseHour={18}
						percent={43}
						CourseMinute={40}
					/>

					{/* <div className='col-md-4'>
						<Card stretch>
							<CardBody className='d-flex align-items-center justify-content-center'>
								<Button
									color='info'
									size='lg'
									isLight
									className='w-100 h-100'
									icon='AddCircle'>
									Add New
								</Button>
							</CardBody>
						</Card>
					</div> */}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ProjectManagementsList;
