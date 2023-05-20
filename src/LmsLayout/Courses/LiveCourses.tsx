import React, { FC, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FormikHelpers, useFormik } from 'formik';
import Card, {
    CardActions,
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import { priceFormat } from '../../helpers/helpers';
import Dropdown, {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import Icon from '../../components/icon/Icon';
import OffCanvas, {
    OffCanvasBody,
    OffCanvasHeader,
    OffCanvasTitle,
} from '../../components/bootstrap/OffCanvas';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Textarea from '../../components/bootstrap/forms/Textarea';
import Checks from '../../components/bootstrap/forms/Checks';
import Popovers from '../../components/bootstrap/Popovers';
import data from '../../common/data/dummyEventsData';
import USERS from '../../common/data/userSessionService';
import EVENT_STATUS from '../../common/data/enumEventStatus';
import Avatar from '../../components/Avatar';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import { Calendar as DatePicker } from 'react-date-range';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { LmsFeatures, demoPagesMenu } from '../../menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppConst, BASE_URL } from '../../common/data/constants';
import { getCookie } from '../../common/data/helper';
import AuthContext from '../../contexts/authContext';
import { ILiveClassList, getLiveClassList } from '../../services/LiveClasses';
import NoData from '../no-data/NoData';

interface ILiveCoursesProps {
    isFluid?: boolean;
}
const LiveCourses = () => {
    const { darkModeStatus } = useDarkMode();
    // BEGIN :: Upcoming Events
    const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);
    const handleUpcomingDetails = () => {
        setUpcomingEventsInfoOffcanvas(!upcomingEventsInfoOffcanvas);
    };

    const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);
    const handleUpcomingEdit = () => {
        setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
    };
    // END :: Upcoming Events

    const formik = useFormik({
        onSubmit<Values>(
            values: Values,
            formikHelpers: FormikHelpers<Values>,
        ): void | Promise<any> {
            return undefined;
        },
        initialValues: {
            customerName: 'Alison Berry',
            service: 'Exercise Bike',
            employee: `${USERS.GRACE.name} ${USERS.GRACE.surname}`,
            location: 'Maryland',
            date: dayjs().add(1, 'days').format('YYYY-MM-DD'),
            time: '10:30',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut nisi odio. Nam sit amet pharetra enim. Nulla facilisi. Nunc dictum felis id massa mattis pretium. Mauris at blandit orci. Nunc vulputate vulputate turpis vitae cursus. In sit amet turpis tincidunt, interdum ex vitae, sollicitudin massa. Maecenas eget dui molestie, ullamcorper ante vel, tincidunt nisi. Donec vitae pulvinar risus. In ultricies nisl ac massa malesuada, vel tempus neque placerat.',
            notify: true,
        },
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(PER_COUNT['5']);
    const Navigate = useNavigate();
    const { themeStatus } = useDarkMode();
    const { session } = useContext(AuthContext);
    const [liveClassList, setLiveClassList] = useState<ILiveClassList[]>([]);
    const { items, requestSort, getClassNamesFor } = useSortableData(
        liveClassList as ILiveClassList[],
        null,
    );

    useEffect(() => {
        const fetchData = async () => {
            await getLiveClassList(3, session?.accessToken).then((res: any) => {
                setLiveClassList(res as ILiveClassList[]);
            });
            // useSortableData(d.items as ILiveClassList[], null);
        };
        fetchData();
    }, [session?.accessToken]);

    const [date, setDate] = useState<Date>(new Date());
    return (
        <>
            <PageWrapper title={LmsFeatures.livecourses.text}>
                <SubHeader>
                    <SubHeaderLeft>
                        <Icon icon='OndemandVideo' color='primary' className='me-2' size='2x' />
                        <span className='text-muted'>
                            Join 12 Live Classes
                            <Icon
                                icon='SmartDisplay'
                                color='success'
                                className='mx-1'
                                size='lg'
                            />{' '}
                            39 Existing Classes
                            <Icon icon='Alarm' color='warning' className='mx-1' size='lg' />
                            And 4 Advance Live Classes Schaduals.
                        </span>
                    </SubHeaderLeft>
                    <SubHeaderRight>
                        <Popovers
                            desc={
                                <DatePicker
                                    onChange={(item) => setDate(item)}
                                    date={date}
                                    color={process.env.REACT_APP_PRIMARY_COLOR}
                                />
                            }
                            placement='bottom-end'
                            className='mw-100'
                            trigger='click'>
                            <Button color={themeStatus}>
                                {`${dayjs(date).startOf('weeks').format('MMM Do')} - ${dayjs(date)
                                    .endOf('weeks')
                                    .format('MMM Do')}`}
                            </Button>
                        </Popovers>
                    </SubHeaderRight>
                </SubHeader>
                <Page>
                    <Card>
                        <CardHeader borderSize={1}>
                            <CardLabel icon='LiveTv' iconColor='info'>
                                <CardTitle>Live Classes</CardTitle>
                            </CardLabel>
                            <CardActions>
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
                            </CardActions>
                        </CardHeader>
                        <CardBody className='table-responsive'>
                            <table className='table table-modern'>
                                <thead>
                                    <tr>
                                        <td style={{ width: 60 }} />
                                        <th
                                            onClick={() => requestSort('date')}
                                            className='cursor-pointer text-decoration-underline'>
                                            Class Info
                                            <Icon
                                                size='lg'
                                                className={getClassNamesFor('date')}
                                                icon='LiveTv'
                                            />
                                        </th>
                                        <th>Status</th>
                                        <th>Duration</th>

                                        <th>Start Time</th>
                                        <th>Created Date</th>
                                        <th>Join Class</th>
                                        <td />
                                    </tr>
                                </thead>
                                <tbody>
                                    {liveClassList === undefined || liveClassList.length === 0 ? (
                                        <NoData />
                                    ) : (
                                        dataPagination(liveClassList, currentPage, perPage).map(
                                            (item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <Button
                                                            isOutline={!darkModeStatus}
                                                            color='dark'
                                                            isLight={darkModeStatus}
                                                            className={classNames({
                                                                'border-light': !darkModeStatus,
                                                            })}
                                                            icon='Info'
                                                            onClick={handleUpcomingDetails}
                                                            aria-label='Detailed information'
                                                        />
                                                        {/* <input
													className='form-check-input'
													type='checkbox'
													value=''
												id='flexCheckChecked'></input> */}
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div>{item.topic}</div>
                                                            <div className='small text-muted'>
                                                                {item.description}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Dropdown>
                                                            <DropdownToggle hasIcon={false}>
                                                                <Button
                                                                    isLink
                                                                    color={item.status.color}
                                                                    icon='Circle'
                                                                    className='text-nowrap'>
                                                                    {item.status}
                                                                </Button>
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                                {Object.keys(EVENT_STATUS).map(
                                                                    (k) => (
                                                                        <DropdownItem key={k}>
                                                                            <div>
                                                                                <Icon
                                                                                    icon='Circle'
                                                                                    color={
                                                                                        EVENT_STATUS[
                                                                                            k
                                                                                        ].color
                                                                                    }
                                                                                />
                                                                                {
                                                                                    EVENT_STATUS[k]
                                                                                        .name
                                                                                }
                                                                            </div>
                                                                        </DropdownItem>
                                                                    ),
                                                                )}
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </td>
                                                    <td>{item.duration}</td>
                                                    <td>
                                                        {/* <div className='d-flex'>
													<div className='flex-shrink-0'>
														<Avatar
															src={item.assigned.src}
															srcSet={item.assigned.srcSet}
															color={item.assigned.color}
															size={36}
														/>
													</div>
													<div className='flex-grow-1 ms-3 d-flex align-items-center text-nowrap'>
														{`${item.assigned.name} ${item.assigned.surname}`}
													</div>
												</div> */}
                                                        <div className='d-flex align-items-center'>
                                                            <span
                                                                className={classNames(
                                                                    'badge',
                                                                    'border border-2',
                                                                    [`border-${themeStatus}`],
                                                                    'rounded-circle',
                                                                    'bg-success',
                                                                    'p-2 me-2',
                                                                    `bg-${item.status}`,
                                                                )}>
                                                                <span className='visually-hidden'>
                                                                    {item.status}
                                                                </span>
                                                            </span>
                                                            <span className='text-nowrap'>
                                                                {dayjs(`${item.startTime}`).format(
                                                                    'MMM Do YYYY, h:mm a',
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex align-items-center'>
                                                            <span
                                                                className={classNames(
                                                                    'badge',
                                                                    'border border-2',
                                                                    [`border-${themeStatus}`],
                                                                    'rounded-circle',
                                                                    'bg-success',
                                                                    'p-2 me-2',
                                                                    `bg-${item.status.color}`,
                                                                )}>
                                                                <span className='visually-hidden'>
                                                                    {item.status.name}
                                                                </span>
                                                            </span>
                                                            <span className='text-nowrap'>
                                                                {dayjs(`${item.startTime}`).format(
                                                                    'MMM Do YYYY, h:mm a',
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            isOutline={!darkModeStatus}
                                                            color='brand'
                                                            isLight={darkModeStatus}
                                                            className={classNames('text-nowrap', {
                                                                'border-light': !darkModeStatus,
                                                            })}
                                                            icon='Add'
                                                            onClick={() =>
                                                                Navigate('../zoom-meeting')
                                                            }>
                                                            Join
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    )}
                                </tbody>
                            </table>
                        </CardBody>
                        {liveClassList === undefined || liveClassList.length === 0 ? (
                            <NoData />
                        ) : (
                            <PaginationButtons
                                data={items}
                                label='items'
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            />
                        )}
                    </Card>

                    <OffCanvas
                        setOpen={setUpcomingEventsInfoOffcanvas}
                        isOpen={upcomingEventsInfoOffcanvas}
                        titleId='upcomingDetails'
                        placement='bottom'>
                        <OffCanvasHeader setOpen={setUpcomingEventsInfoOffcanvas}>
                            <OffCanvasTitle id='upcomingDetails'>
                                Customer: Alison Berry
                            </OffCanvasTitle>
                        </OffCanvasHeader>
                        <OffCanvasBody>
                            <div className='row g-4'>
                                <div className='col-lg-6'>
                                    <FormGroup
                                        id='dateInfo'
                                        name='date'
                                        label='Date/Time'
                                        isColForLabel
                                        labelClassName='col-sm-2 text-capitalize'
                                        childWrapperClassName='col-sm-10'>
                                        <Input
                                            value={dayjs(
                                                // @ts-ignore
                                                `${data.find((e) => e.id === 1).date} ${
                                                // @ts-ignore
                                                data.find((e) => e.id === 1).time
                                                }`,
                                            ).format('MMM Do YYYY, h:mm a')}
                                            readOnly
                                            disabled
                                        />
                                    </FormGroup>
                                </div>
                                <div className='w-100' />
                                <div className='col-lg-6'>
                                    <FormGroup
                                        id='noteInfo'
                                        name='note'
                                        label='Note'
                                        isColForLabel
                                        labelClassName='col-sm-2 text-capitalize'
                                        childWrapperClassName='col-sm-10'>
                                        <Textarea value={formik.values.note} readOnly disabled />
                                    </FormGroup>
                                </div>
                            </div>
                        </OffCanvasBody>
                    </OffCanvas>

                    <OffCanvas
                        setOpen={setUpcomingEventsEditOffcanvas}
                        isOpen={upcomingEventsEditOffcanvas}
                        titleId='upcomingEdit'
                        isBodyScroll
                        placement='end'>
                        <OffCanvasHeader setOpen={setUpcomingEventsEditOffcanvas}>
                            <OffCanvasTitle id='upcomingEdit'>Edit Appointments</OffCanvasTitle>
                        </OffCanvasHeader>
                        <OffCanvasBody>
                            <div className='row g-4'>
                                <div className='col-12'>
                                    <FormGroup id='customerName' label='Customer'>
                                        <Input
                                            onChange={formik.handleChange}
                                            value={formik.values.customerName}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-12'>
                                    <FormGroup id='service' label='Service'>
                                        <Input
                                            onChange={formik.handleChange}
                                            value={formik.values.service}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-12'>
                                    <FormGroup id='employee' label='Employee'>
                                        <Input
                                            onChange={formik.handleChange}
                                            value={formik.values.employee}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-12'>
                                    <FormGroup id='location' label='Location'>
                                        <Input
                                            onChange={formik.handleChange}
                                            value={formik.values.location}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-6'>
                                    <FormGroup id='date' label='Date'>
                                        <Input
                                            onChange={formik.handleChange}
                                            value={formik.values.date}
                                            type='date'
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-6'>
                                    <FormGroup id='time' label='time'>
                                        <Input
                                            onChange={formik.handleChange}
                                            value={formik.values.time}
                                            type='time'
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-12'>
                                    <Card isCompact borderSize={2} shadow='none' className='mb-0'>
                                        <CardHeader>
                                            <CardLabel>
                                                <CardTitle>Extras</CardTitle>
                                            </CardLabel>
                                        </CardHeader>
                                        <CardBody>
                                            <FormGroup id='note' label='Note'>
                                                <Textarea
                                                    onChange={formik.handleChange}
                                                    value={formik.values.note}
                                                />
                                            </FormGroup>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className='col-12'>
                                    <Card isCompact borderSize={2} shadow='none' className='mb-0'>
                                        <CardHeader>
                                            <CardLabel>
                                                <CardTitle>Notification</CardTitle>
                                            </CardLabel>
                                        </CardHeader>
                                        <CardBody>
                                            <FormGroup>
                                                <Checks
                                                    id='notify'
                                                    type='switch'
                                                    label={
                                                        <>
                                                            Notify the Customer
                                                            <Popovers
                                                                trigger='hover'
                                                                desc='Check this checkbox if you want your customer to receive an email about the scheduled appointment'>
                                                                <Icon
                                                                    icon='Help'
                                                                    size='lg'
                                                                    className='ms-1 cursor-help'
                                                                />
                                                            </Popovers>
                                                        </>
                                                    }
                                                    onChange={formik.handleChange}
                                                    checked={formik.values.notify}
                                                />
                                            </FormGroup>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </OffCanvasBody>
                        <div className='row m-0'>
                            <div className='col-12 p-3'>
                                <Button
                                    color='info'
                                    className='w-100'
                                    onClick={() => setUpcomingEventsEditOffcanvas(false)}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </OffCanvas>
                </Page>
            </PageWrapper>
        </>
    );
}

export default LiveCourses;
