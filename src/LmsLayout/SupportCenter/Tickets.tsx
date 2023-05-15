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
import {
	ITicket,
	ITicketReply,
	getCategotyDropdown,
	getPriorityDropdown,
	getTicketList,
	postTicket,
} from '../../services/TicketService';
import Black_WebbieLogo from '../../components/Black_WebbieLogo';
import Modal, {
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from '../../components/bootstrap/Modal';
import Label from '../../components/bootstrap/forms/Label';
import NoData from '../no-data/NoData';

interface ITicketProps {
	isFluid?: boolean;
}
function Ticket() {
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
	const [TicketList, setTicketList] = useState<ITicket[]>([]);
	const { items, requestSort, getClassNamesFor } = useSortableData(TicketList as ITicket[], null);

	const tenant = getCookie(AppConst.TenantID);
	const tenantName = getCookie(AppConst.TenantName);
	const [dropdownCategory, setDropdownCategory] = useState<any[]>([]);
	const [dropdownPriority, setDropdownPriority] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const d = await getTicketList(1, 1, session?.accessToken);
			setTicketList(d.items as ITicket[]);
			// useSortableData(d.items as ITicket[], null);
			// console.log(d.items);
			const dropCategory = await getCategotyDropdown(session?.accessToken);
			const dropPriority = await getPriorityDropdown(session?.accessToken);
			setDropdownCategory(dropCategory);
			setDropdownPriority(dropPriority);
		};
		fetchData();
	}, []);

	const [date, setDate] = useState<Date>(new Date());
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const [subject, setSubject] = useState('');
	const [priority, setPriority] = useState('');
	const [priorityID, setPriorityID] = useState(0);
	const [categoty, setCategoty] = useState('');
	const [categotyID, setCategotyID] = useState(0);

	const [discription, setDiscription] = useState('');

	const TicketData: ITicket = {
		tenantId: parseInt(tenant),
		categoryID: categotyID,
		refNo: '',
		tags: '',
		subject: subject,
		body: discription,
		issuedTo: 0,
		priority: priorityID,
		isPopular: false,
		status: 1,
		category: categoty,
		creatorUserName: tenantName,
		ticketReply: [],
		id: 0,
	};

	const HandleSubmitTicket = async () => {
		await postTicket(TicketData, session?.accessToken);
	};

	const handleCategory = (e: any) => {
		setCategotyID(parseInt(e.taget.value));
		setCategoty(e.taget.value);
		setCategoty(dropdownCategory[parseInt(e.target.value)]);
	};
	const handlePriority = (e: any) => {
		setPriorityID(parseInt(e.target.value));
		setPriority(dropdownPriority[parseInt(e.target.value)]);
	};

	return (
		<>
			<PageWrapper title={LmsFeatures.supportcenter.text}>
				<Page>
					<Card>
						<CardHeader borderSize={1}>
							<CardLabel icon='AutoAwesomeMotion' iconColor='info'>
								<CardTitle>Tickets</CardTitle>
							</CardLabel>
							<CardActions>
								<Button
									color='info'
									icon='Add'
									isLight
									onClick={() => setIsOpenModal(true)}>
									Create New Ticket
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
											Subject
										</th>
										<th>Categoty</th>
										<th>Priority</th>

										<th>Status</th>
										<th>Reply</th>
										<td />
									</tr>
								</thead>
								<tbody>
									{TicketList === undefined || TicketList.length === 0 ? (
										<NoData />
									) : (
										dataPagination(TicketList, currentPage, perPage).map(
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
															<div>{item.subject}</div>
														</div>
													</td>
													<td>
														<td>{item.category}</td>
													</td>
													<div>{item.priority}</div>
													<td>
														<div>{item.status}</div>
													</td>
													<td>
														<Button
															isOutline={!darkModeStatus}
															color='brand'
															isLight={darkModeStatus}
															className={classNames('text-nowrap', {
																'border-light': !darkModeStatus,
															})}
															icon='Reply'
															onClick={() =>
																Navigate('../zoom-meeting')
															}>
															Reply
														</Button>
													</td>
												</tr>
											),
										)
									)}
								</tbody>
							</table>
						</CardBody>
						<PaginationButtons
							data={items}
							label='items'
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
							perPage={perPage}
							setPerPage={setPerPage}
						/>
					</Card>
					{isOpenModal && (
						<Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} titleId='tour-title'>
							<ModalHeader setIsOpen={setIsOpenModal} className='mx-2'>
								<ModalTitle id='tour-title' className='d-flex align-items-center'>
									<Black_WebbieLogo height={28} />
									<span className='ps-2'>Support</span>
									<span className='ps-2'>
										<Icon icon='Verified' color='info' />
									</span>
								</ModalTitle>
							</ModalHeader>
							<ModalBody className='mx-2'>
								{/* <CreateTicket /> */}
								<div className='row mt-0 pt-0'>
									<div className='col-md-12 mt-0 pt-0 d-flex align-items-center'>
										<div className='d-flex justify-content-center'>
											<div className='text-center'>
												<h2 className='mb-3'>Create Ticket</h2>

												<h5 className='text-center'>
													<span>
														If you need more info, please check
														<a href='' className='px-2'>
															Support Guidelines
														</a>
													</span>
												</h5>
											</div>
										</div>
									</div>

									<div>
										<FormGroup className='my-4'>
											<Label htmlFor='Subject'>Subject</Label>
											<Input
												id='subject'
												placeholder='Enter Your Ticket Subject'
												aria-label='subject'
												value={subject}
												onChange={(e: any) => setSubject(e.target.value)}
											/>
										</FormGroup>
										<FormGroup className='my-4'>
											<div className='d-flex justify-content-between'>
												<div
													className='w-100'
													style={{ marginRight: '8px' }}>
													<Label htmlFor='category'>Category</Label>
													<select
														className=' form-select form-control '
														data-kt-select2='true'
														data-placeholder='Select option'
														data-allow-clear='true'
														// defaultValue='Select Category'
														placeholder='Select Category'
														disabled={false}
														onChange={(e) => handleCategory(e)}>
														{dropdownCategory.map(
															(dropItem: any, key: number) => (
																<option
																	key={key}
																	value={dropItem.value}>
																	{dropItem.text}
																</option>
															),
														)}
													</select>
												</div>
												<div
													className='w-100'
													style={{ marginLeft: '8px' }}>
													<Label htmlFor='Priority'>Priority</Label>
													<select
														className=' form-select form-control '
														data-kt-select2='true'
														data-placeholder='Select option'
														data-allow-clear='true'
														// defaultValue={dropdownPriority[0]}
														disabled={false}
														onChange={(e) => handlePriority(e)}>
														{dropdownPriority.map(
															(dropItem: any, key: number) => (
																<option
																	key={key}
																	value={dropItem.value}>
																	{dropItem.text}
																</option>
															),
														)}
													</select>
												</div>
											</div>
										</FormGroup>
										<FormGroup className='mt-4'>
											<Label htmlFor='Description'>Description</Label>
											<Textarea
												id='Description'
												ariaLabel='With textarea'
												onChange={(e: any) => {
													setDiscription(e.target.value);
												}}
											/>
										</FormGroup>
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									icon='Close'
									color='danger'
									isLink
									onClick={() => setIsOpenModal(false)}>
									Cancel
								</Button>
								<Button
									isOutline={!themeStatus}
									color='primary'
									className={classNames('text-nowrap', {
										'border-light': !themeStatus,
									})}
									icon='Save'
									onClick={() => {
										HandleSubmitTicket();
									}}>
									Save
								</Button>
							</ModalFooter>
						</Modal>
					)}

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

export default Ticket;
