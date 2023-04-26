import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../layout/SubHeader/SubHeader';
import Page from '../layout/Page/Page';
// import validate from './helper/editPagesValidate';
import validate from '../pages/presentation/demo-pages/helper/editPagesValidate';
import showNotification from '../components/extras/showNotification';
import Icon from '../components/icon/Icon';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../components/bootstrap/Card';
import Button from '../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../components/bootstrap/Dropdown';
import useDarkMode from '../hooks/useDarkMode';
import Spinner from '../components/bootstrap/Spinner';
import FormGroup from '../components/bootstrap/forms/FormGroup';
import Input from '../components/bootstrap/forms/Input';
import Breadcrumb from '../components/bootstrap/Breadcrumb';
import Avatar from '../components/Avatar';
import USERS, { getUserDataWithId } from '../common/data/userDummyData';
import CommonDesc from '../common/other/CommonDesc';
import Label from '../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../components/bootstrap/forms/Checks';
import Alert from '../components/bootstrap/Alert';
import Modal, {
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from '../components/bootstrap/Modal';
import Logo from '../components/Logo';
import { useNavigate, useParams } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import Img from '../assets/img/wanna/susy/susy9.png';
import VerifyEmail from '../common/LMS_Common/VerifyEmail';
import Verifynumber from '../common/LMS_Common/VerifyNumber';
import ChatStatusBar from '../pages/_common/StatusBar';

const LmsUserProfile = () => {
	const { themeStatus } = useDarkMode();

	/**
	 * Common
	 */
	const [lastSave, setLastSave] = useState<Dayjs | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleSave = () => {
		setLastSave(dayjs());
		setIsLoading(false);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Updated Successfully</span>
			</span>,
			"The user's account details have been successfully updated.",
		);
	};
	// const { id } = useParams();
	// const data = getUserDataWithId(id);

	const formik = useFormik({
		initialValues: {
			firstName: 'John',
			lastName: 'Doe',
			displayName: 'johndoe',
			address: 'New Yark',
			emailAddress: 'johndoe@site.com',
			phone: '',
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
			checkOne: true,
			checkTwo: false,
			checkThree: true,
		},
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});

	const [passwordChangeCTA, setPasswordChangeCTA] = useState<boolean>(false);

	const navigate = useNavigate();
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	useEffect(() => {
		const timeout = setTimeout(() => setIsOpenModal(true), 3000);
		return () => {
			setIsOpenModal(false);
			clearTimeout(timeout);
		};
	}, []);
	const { setIsOpen } = useTour();

	// const { id } = useParams();
	const data = getUserDataWithId('1');

	return (
		<PageWrapper title={demoPagesMenu.editPages.subMenu.editModern.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Users', to: '/' },
							{ title: 'Edit User', to: '/' },
						]}
					/>
					<SubheaderSeparator />
					<span className='text-muted'>John Doe</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						icon={isLoading ? undefined : 'Save'}
						isLight
						color={lastSave ? 'info' : 'success'}
						isDisable={isLoading}
						onClick={formik.handleSubmit}>
						{isLoading && <Spinner isSmall inButton />}
						{isLoading
							? (lastSave && 'Saving') || 'Publishing'
							: (lastSave && 'Save') || 'Publish'}
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100 align-content-start'>
					<div className='col-md-8'>
						<Card>
							<CardHeader>
								<CardLabel icon='Person' iconColor='success'>
									<CardTitle>Profile Picture</CardTitle>
									<CardSubTitle>Upload your profile picture</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='col-12'>
									<div className='row g-4 align-items-center'>
										<div className='col-lg-auto'>
											<Avatar
												srcSet={USERS.JOHN.srcSet}
												src={USERS.JOHN.src}
												color={USERS.JOHN.color}
												rounded={3}
											/>
										</div>
										<div className='col-lg'>
											<div className='row g-4'>
												<div className='col-auto'>
													<Input type='file' autoComplete='photo' />
												</div>
												<div className='col-auto'>
													<Button color='dark' isLight icon='Delete'>
														Delete Avatar
													</Button>
												</div>
												<div className='col-12'>
													<p className='lead text-muted'>
														Avatar helps your teammates get to know you.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Person' iconColor='success'>
									<CardTitle>Personal Information</CardTitle>
									<CardSubTitle>User's credentials</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup id='firstName' label='First Name' isFloating>
											<Input
												placeholder='First Name'
												autoComplete='additional-name'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.firstName}
												isValid={formik.isValid}
												isTouched={formik.touched.firstName}
												invalidFeedback={formik.errors.firstName}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='lastName' label='Last Name' isFloating>
											<Input
												placeholder='Last Name'
												autoComplete='family-name'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.lastName}
												isValid={formik.isValid}
												isTouched={formik.touched.lastName}
												invalidFeedback={formik.errors.lastName}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-6'>
										<FormGroup
											id='displayName'
											label='Display Name'
											isFloating
											formText='This will be how your name will be displayed in the account section and in reviews'>
											<Input
												placeholder='Display Name'
												autoComplete='username'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.displayName}
												isValid={formik.isValid}
												isTouched={formik.touched.displayName}
												invalidFeedback={formik.errors.displayName}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-6'>
										<FormGroup
											id='address'
											label='Address'
											isFloating
											formText='This will be how your name will be displayed in the account section and in reviews'>
											<Input
												placeholder='Address'
												autoComplete='username'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.address}
												isValid={formik.isValid}
												isTouched={formik.touched.address}
												invalidFeedback={formik.errors.address}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Phonelink' iconColor='danger'>
									<CardTitle>Contact Information</CardTitle>
									<CardSubTitle>User's contact information</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup
											id='emailAddress'
											label='Email address'
											isFloating>
											<Input
												type='email'
												placeholder='Email address'
												autoComplete='email'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.emailAddress}
												isValid={formik.isValid}
												isTouched={formik.touched.emailAddress}
												invalidFeedback={formik.errors.emailAddress}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{/* <div className='d-flex justify-content-between align-items-center'>
											<p className='pt-2 mx-3'>Verify Your Email Address</p>

											<CardActions>
												<Button
													color='brand'
													isLight
													icon='PublishedWithChanges'
													onClick={() => setEmailVerification(true)}>
													Verify
												</Button>
											</CardActions>
										</div> */}
										<VerifyEmail />
									</div>
									{/* {EmailVerification && 
									
									} */}
									<div className='col-md-6'>
										<FormGroup id='phone' label='Phone Number' isFloating>
											<Input
												type='tel'
												placeholder='Phone Number'
												autoComplete='tel'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.phone}
												isValid={formik.isValid}
												isTouched={formik.touched.phone}
												invalidFeedback={formik.errors.phone}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										<Verifynumber />
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='LocalPolice' iconColor='primary'>
									<CardTitle>Password</CardTitle>
									<CardSubTitle>Password change operations</CardSubTitle>
								</CardLabel>
								<CardActions>
									{passwordChangeCTA ? (
										<Button
											color='danger'
											isLight
											icon='Cancel'
											onClick={() => setPasswordChangeCTA(false)}>
											Cancel
										</Button>
									) : (
										<>
											<span>Do you want to change?</span>
											<Button
												color='primary'
												isLight
												icon='PublishedWithChanges'
												onClick={() => setPasswordChangeCTA(true)}>
												Yes
											</Button>
										</>
									)}
								</CardActions>
							</CardHeader>
							{passwordChangeCTA && (
								<CardBody>
									<div className='row g-4'>
										<div className='col-12'>
											<FormGroup
												id='currentPassword'
												label='Current password'
												isFloating>
												<Input
													type='password'
													placeholder='Current password'
													autoComplete='current-password'
													onChange={formik.handleChange}
													value={formik.values.currentPassword}
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='newPassword'
												label='New password'
												isFloating>
												<Input
													type='password'
													placeholder='New password'
													autoComplete='new-password'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.newPassword}
													isValid={formik.isValid}
													isTouched={formik.touched.newPassword}
													invalidFeedback={formik.errors.newPassword}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='confirmPassword'
												label='Confirm new password'
												isFloating>
												<Input
													type='password'
													placeholder='Confirm new password'
													autoComplete='new-password'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.confirmPassword}
													isValid={formik.isValid}
													isTouched={formik.touched.confirmPassword}
													invalidFeedback={formik.errors.confirmPassword}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
									</div>
								</CardBody>
							)}
							<CardFooter>
								<CommonDesc>
									For your security, we recommend that you change your password
									every 3 months at most.
								</CommonDesc>
							</CardFooter>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Person' iconColor='success'>
									<CardTitle>Profile Visibility</CardTitle>
									<CardSubTitle>
										Change Your Profile's public appearance
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<ChatStatusBar />
								<div className='row g-4 d-flex justify-content-end'>
									<Button
										color='primary'
										isLight
										icon='PublishedWithChanges'
										className='px-5'
										style={{ maxWidth: 'max-content' }}
										// onClick={() => setPasswordChangeCTA(true)}
									>
										Visibility
									</Button>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Person' iconColor='success'>
									<CardTitle>Social Authentication</CardTitle>
									<CardSubTitle>
										Menage your social login authentication
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<ChatStatusBar />
								<div className='row g-4'>
									<Button
										color='primary'
										isLight
										icon='PublishedWithChanges'
										// className='px-3'
										// onClick={() => setPasswordChangeCTA(true)}
									>
										Authentication
									</Button>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Person' iconColor='success'>
									<CardTitle>Subscription Management</CardTitle>
									<CardSubTitle>
										Check your Package details and also change
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4 d-flex justify-content-end'>
									<Button
										color='primary'
										isLight
										icon='PublishedWithChanges'
										className='px-5'
										style={{ maxWidth: 'max-content' }}
										// onClick={() => setPasswordChangeCTA(true)}
									>
										Package's
									</Button>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-4'>
						{/* <Card className='position-sticky sticky-top-size'>
							<CardHeader>
								<CardLabel icon='MarkEmailUnread'>
									<CardTitle>Email notification</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row'>
									<div className='col-12'>
										<FormGroup>
											<Label>
												Choose what messages you’d like to receive for each
												of your accounts.
											</Label>
											<ChecksGroup>
												<Checks
													type='switch'
													id='inlineCheckOne'
													label='Successful Payments'
													name='checkOne'
													onChange={formik.handleChange}
													checked={formik.values.checkOne}
												/>
												<Checks
													type='switch'
													id='inlineCheckTwo'
													label='Payouts'
													name='checkTwo'
													onChange={formik.handleChange}
													checked={formik.values.checkTwo}
												/>
												<Checks
													type='switch'
													id='inlineCheckThree'
													label='Application fees'
													name='checkThree'
													onChange={formik.handleChange}
													checked={formik.values.checkThree}
												/>
											</ChecksGroup>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card> */}
						<Card className='shadow-3d-info'>
							<CardBody>
								<div className='row g-5'>
									<div className='col-12 d-flex justify-content-center'>
										<Avatar
											src={data.src}
											srcSet={data.srcSet}
											color={data.color}
											isOnline={data.isOnline}
										/>
									</div>
									<div className='col-12'>
										<div className='row g-2'>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon icon='Mail' size='3x' color='info' />
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{`${data.username}@site.com`}
														</div>
														<div className='text-muted'>
															Email Address
														</div>
													</div>
												</div>
											</div>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon icon='Tag' size='3x' color='info' />
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{`@${data.username}`}
														</div>
														<div className='text-muted'>
															Social name
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardBody>
								<div className='row align-items-center'>
									<div className='col'>
										{lastSave ? (
											<>
												<Icon
													icon='DoneAll'
													size='lg'
													className='me-2 text-muted'
												/>
												<span className='me-2 text-muted'>Last Saved</span>
												<strong>
													{dayjs(lastSave).format(
														'MMMM Do, YYYY - HH:mm',
													)}
												</strong>
											</>
										) : (
											<>
												<Icon
													icon='Warning'
													size='lg'
													className='me-2 text-warning'
												/>
												<span className='text-warning'>Not saved yet</span>
											</>
										)}
									</div>
									<div className='col-auto'>
										<div className='row g-1'>
											<div className='col-auto'>
												<Button
													className='me-3'
													icon={isLoading ? undefined : 'Save'}
													isLight
													color={lastSave ? 'info' : 'success'}
													isDisable={isLoading}
													onClick={formik.handleSubmit}>
													{isLoading && <Spinner isSmall inButton />}
													{isLoading
														? (lastSave && 'Saving') || 'Publishing'
														: (lastSave && 'Save') || 'Publish'}
												</Button>
											</div>
											<div className='col-auto'>
												<Dropdown direction='up'>
													<DropdownToggle hasIcon={false}>
														<Button
															color={themeStatus}
															icon='MoreVert'
														/>
													</DropdownToggle>
													<DropdownMenu isAlignmentEnd>
														<DropdownItem>
															<Button
																className='me-3'
																icon='Save'
																isLight
																isDisable={isLoading}
																onClick={formik.resetForm}>
																Reset
															</Button>
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default LmsUserProfile;
