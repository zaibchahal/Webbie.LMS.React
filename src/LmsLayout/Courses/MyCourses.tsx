import React, { FC, HTMLAttributes, useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import USERS from '../../common/data/userSessionService';
import CommonAvatarTeam from '../../common/other/CommonAvatarTeam';
import Avatar, { AvatarGroup } from '../../components/Avatar';
import Button from '../../components/bootstrap/Button';
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
import { getStudyPlannerList } from '../../services/StudyPlanner';
import { GetCourse, GetSearchContent, getMyCoursesList } from '../../services/Courses.server';
import AuthContext from '../../contexts/authContext';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';
import {
    UpdateCourse,
    UpdateCoursesList,
    UpdateMyCourse,
    UpdateVideoSrc,
} from '../../@features/MyCourses/Courses.slice';

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
    // const handleOnClickToProjectPage = useCallback(() => navigate(`../courses-page`), [navigate]);
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <div className='col-md-4' {...props}>
            <Card stretch className='cursor-pointer'>
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
    // const handleOnClickToEmployeeListPage = useCallback(
    // 	() => navigate(`../${demoPagesMenu.appointment.subMenu.employeeList.path}`),
    // 	[navigate],
    // );

    const { session } = useContext(AuthContext);
    const dispatch = useDispatch<AppDispatch>();
    let myCoursesStore = useSelector((store: RootState) => store.myCourses);
    const handleOnClickToProjectPage = (CourseId: any) => {
        GetCourse(CourseId, session?.accessToken).then((res) => {
            dispatch(UpdateCourse(res));
            console.log(res);
            navigate('../courses-page');
        });
    };

    useEffect(() => {
        getMyCoursesList(session?.userId, session?.accessToken).then((res) => {
            console.log(res);
            dispatch(UpdateCoursesList(res));
        });
        GetSearchContent('cha', session?.accessToken).then((res) => {
            console.log(res);
            // dispatch(UpdateCoursesList(res));
        });
    }, [session?.accessToken, session?.userId, dispatch]);

    return (
        <PageWrapper title={demoPagesMenu.projectManagement.subMenu.list.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <strong className='fs-5'>Hi John</strong>
                    <SubheaderSeparator />
                    <span>
                        There are
                        <Badge color='info' isLight>
                            2 teams
                        </Badge>
                        you are in and
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
                    {myCoursesStore.CoursesList.map((item, k) => (
                        <Item
                            key={k}
                            name={item.courseTitle}
                            teamName='Biology'
                            dueDate='3 days left'
                            NumberOfLectures={item.lessons}
                            CourseHour={Math.floor(item.time / 60)}
                            percent={65}
                            data-tour='project-item'
                            CourseMinute={item.time % 60}
                            onClick={() => handleOnClickToProjectPage(item.id)}
                        />
                    ))}

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
