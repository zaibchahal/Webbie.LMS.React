import React, { useEffect } from 'react';
import { LmsDashboard, LmsFeatures } from '../../menu';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Alert from '../../components/bootstrap/Alert';
import Button from '../../components/bootstrap/Button';
import Card, {
	CardTabItem,
	CardHeader,
	CardLabel,
	CardTitle,
	CardBody,
	CardFooter,
	CardFooterRight,
} from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import useDarkMode from '../../hooks/useDarkMode';
import CommonUpcomingEvents from '../../pages/_common/CommonUpcomingEvents';
import Page from '../../layout/Page/Page';
import ListFluidPage from '../../pages/presentation/demo-pages/ListFluidPage';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { UpdateName } from '../../@features/User/userSlice';

const MyFiles = () => {
	const { darkModeStatus } = useDarkMode();
	const dispatch = useDispatch<AppDispatch>();
	let user = useSelector((store: RootState) => store.user);

	useEffect(() => {
		dispatch(UpdateName('My File'));
		console.log(user);
	}, []);

	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			formPrefix: 'Prof.',
			formName: 'Timothy',
			formMiddleName: 'John',
			formSurName: 'Doe',
			formEmailAddress: 'tjohndoe@site.com',
			formPhone: '2575637401',
			formAddressLine: '711-2880 Nulla St.',
			formAddressLine2: 'Mankato',
			formCity: 'Mississippi',
			formState: 'USA',
			formZIP: '96522',
			formCurrentPassword: '',
			formNewPassword: '',
			formConfirmNewPassword: '',
		},
		onSubmit: (values) => {
			// eslint-disable-next-line no-console
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Information</span>
				</span>,
				JSON.stringify(values, null, 2),
			);
		},
	});
	return (
		<PageWrapper title={LmsFeatures.myfavourites.text}>
			<Page>
				<Card hasTab>
					<CardTabItem id='videos' title='Videos' icon='Shop'>
						<Alert isLight className='border-0' shadow='md' icon='LocalPolice'>
							The information is not shared with third parties.
						</Alert>
						<CommonUpcomingEvents isFluid />
						{/* <Alert
							isLight
							className='border-0'
							shadow='md'
							icon='Public'
							color='warning'>
							As soon as you save the information, it will be shown to everyone
							automatically.
						</Alert> */}
					</CardTabItem>
					<CardTabItem id='audios' title='Audios' icon='LibraryMusic'>
						<Card className='rounded-2' tag='form' onSubmit={formik.handleSubmit}>
							<CardHeader>
								<CardLabel icon='HolidayVillage'>
									<CardTitle>Address Information</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<FormGroup
										className='col-12'
										id='formAddressLine'
										label='Address Line'>
										<Input
											placeholder='Address Line'
											autoComplete='address-line1'
											onChange={formik.handleChange}
											value={formik.values.formAddressLine}
										/>
									</FormGroup>
									<FormGroup
										className='col-12'
										id='formAddressLine2'
										label='Address Line 2'>
										<Input
											placeholder='Address Line 2'
											autoComplete='address-line2'
											onChange={formik.handleChange}
											value={formik.values.formAddressLine2}
										/>
									</FormGroup>
									<FormGroup className='col-md-6' id='formCity' label='City'>
										<Input
											placeholder='City'
											autoComplete='address-level2'
											onChange={formik.handleChange}
											value={formik.values.formCity}
										/>
									</FormGroup>
									<FormGroup className='col-md-4' id='formState' label='State'>
										<Input
											placeholder='State'
											autoComplete='country-name'
											onChange={formik.handleChange}
											value={formik.values.formState}
										/>
									</FormGroup>
									<FormGroup className='col-md-2' id='formZIP' label='ZIP Code'>
										<Input
											placeholder='ZIP'
											autoComplete='postal-code'
											onChange={formik.handleChange}
											value={formik.values.formZIP}
										/>
									</FormGroup>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterRight>
									<Button type='submit' color='info' icon='Save'>
										Save
									</Button>
								</CardFooterRight>
							</CardFooter>
						</Card>
					</CardTabItem>
					<CardTabItem id='mcq' title="Mcq's" icon='AutoStories'>
						<Card className='rounded-2' tag='form' onSubmit={formik.handleSubmit}>
							<CardHeader>
								<CardLabel icon='Lock'>
									<CardTitle>Change Password</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<FormGroup
										className='col-lg-4'
										id='formCurrentPassword'
										label='Current Password'>
										<Input
											type='password'
											placeholder='Current Password'
											autoComplete='current-password'
											onChange={formik.handleChange}
											value={formik.values.formCurrentPassword}
										/>
									</FormGroup>
									<div className='w-100 m-0' />
									<FormGroup
										className='col-lg-4'
										id='formNewPassword'
										label='New Password'>
										<Input
											type='password'
											placeholder='New Password'
											autoComplete='new-password'
											onChange={formik.handleChange}
											value={formik.values.formNewPassword}
										/>
									</FormGroup>
									<div className='w-100 m-0' />
									<FormGroup
										className='col-lg-4'
										id='formConfirmNewPassword'
										label='Confirm New Password'>
										<Input
											type='password'
											placeholder='Confirm New Password'
											autoComplete='new-password'
											onChange={formik.handleChange}
											value={formik.values.formConfirmNewPassword}
										/>
									</FormGroup>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterRight>
									<Button type='submit' color='info' icon='Save'>
										Change Password
									</Button>
								</CardFooterRight>
							</CardFooter>
						</Card>
					</CardTabItem>
					<CardTabItem id='pdf' title='Pdf' icon='PictureAsPdf'>
						<Alert isLight className='border-0' shadow='md' icon='LocalPolice'>
							The information is not shared with third parties.
						</Alert>
						{/* <Alert
							isLight
							className='border-0'
							shadow='md'
							icon='Public'
							color='warning'>
							As soon as you save the information, it will be shown to everyone
							automatically.
						</Alert> */}
					</CardTabItem>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default MyFiles;
