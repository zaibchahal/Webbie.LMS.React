import React, { useEffect, useRef, useContext, useState } from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import dayjs, { Dayjs } from 'dayjs';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../menu';
import SubHeader, {
    SubHeaderLeft,
    SubHeaderRight,
    SubheaderSeparator,
} from '../layout/SubHeader/SubHeader';
import Page from '../layout/Page/Page';
import validate from '../pages/presentation/demo-pages/helper/editPagesValidate';
import pswvalidate from '../pages/presentation/demo-pages/helper/editPasswordValidate';
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
import USERS from '../common/data/userSessionService';
import CommonDesc from '../common/other/CommonDesc';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import VerifyEmail from '../common/LMS_Common/VerifyEmail';
import Verifynumber from '../common/LMS_Common/VerifyNumber';
import ChatStatusBar from '../pages/_common/StatusBar';
import Progress from '../components/bootstrap/Progress';
// import { Google, Facebook, Twitter, GitHub } from '@mui/icons-material';
// import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import SocialAuth from './SocialAuthentication/SocialAuth';

import axios, { AxiosError } from 'axios';
import { AppConst, PROFILE_URLS } from '../common/data/constants';
import AuthContext from '../contexts/authContext';
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
const LmsUserProfile = () => {
    const { session } = useContext(AuthContext);
    const { themeStatus } = useDarkMode();
    const { profilePicture, userData, handleSetProfilePicture } = useContext(AuthContext);

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
    const handleChangePassword = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(PROFILE_URLS.ChangePassword, pswformik.values, {
                headers: {
                    Accept: 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'X-XSRF-TOKEN': 'null',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                withCredentials: true,
            });
            var data = response.data.result;

            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>Updated Successfully</span>
                </span>,
                "The user's password have been successfully updated.",
            );
        } catch (e: any) {
            var m = e.response.data.error.message || '';
            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Error' size='lg' className='me-1' />
                    <span>Not Updated</span>
                </span>,
                m,
            );
        }
        setIsLoading(false);
    };

    const [image, setImage] = useState('');
    function handleImage(e: any) {
        console.log(e.target.files);
        setImage(e.target.files[0]);
    }
    const formData = new FormData();
    async function handleApi() {
        setIsLoading(true);
        try {
            const t = uuidv4();
            formData.append('ProfilePicture', image);
            formData.append('FileName', (image as any).name);
            formData.append('FileToken', t);

            var res = await axios
                .post(PROFILE_URLS.UploadProfilePicture, formData, {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                    withCredentials: true,
                })
                .then((res2) => {
                    const result = res2.data.result;
                    console.log(result);
                    if (res2.data.success) {
                        axios
                            .put(
                                PROFILE_URLS.UpdateProfilePicture,
                                {
                                    fileToken: t,
                                    x: 0,
                                    y: 0,
                                    width: result.width,
                                    height: result.height,
                                    useGravatarProfilePicture: false,
                                },
                                {
                                    headers: {
                                        Accept: 'text/plain',
                                        'Content-Type': 'application/json-patch+json',
                                        'X-XSRF-TOKEN': 'null',
                                        Authorization: `Bearer ${session?.accessToken}`,
                                    },
                                    withCredentials: true,
                                },
                            )
                            .then((res3) => {
                                if (res3.data.success) {
                                    if (handleSetProfilePicture)
                                        handleSetProfilePicture(session?.accessToken);
                                }
                            });
                    }
                });
        } catch (e: any) {
            console.log(e);
        }
        setIsLoading(false);
    }
    const data = userData || {};

    const formik = useFormik({
        initialValues: {
            firstName: data.name || '',
            lastName: data.surname || '',
            displayName: data.username || '',
            address: '',
            emailAddress: data.emailAddress || '',
            phone: data.phoneNumber || '',
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
    const pswformik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validate: pswvalidate,
        onSubmit: () => {
            handleChangePassword();
        },
    });

    const [passwordChangeCTA, setPasswordChangeCTA] = useState<boolean>(false);

    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const location = useLocation();
    const [activeSection, setActiveSection] = useState('');
    const ChangePasswordRef = useRef<HTMLDivElement>(null);
    const verificationRef = useRef<HTMLDivElement>(null);
    const ProfileVisibilityRef = useRef<HTMLDivElement>(null);
    const SocialAuthRef = useRef<HTMLDivElement>(null);
    const SubScriptionRef = useRef<HTMLDivElement>(null);
    const DeviceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const path = location.pathname;
        console.log(path.slice(1));

        {
            path === '/user-profile' && window.scrollTo({ top: 0, behavior: 'smooth' });
            path === '/email-verification' &&
                verificationRef.current?.scrollIntoView({ behavior: 'smooth' });
            path === '/sms-verification' &&
                verificationRef.current?.scrollIntoView({ behavior: 'smooth' });
            path === '/change-password' &&
                ChangePasswordRef.current?.scrollIntoView({ behavior: 'smooth' });
            path === '/device-management' &&
                DeviceRef.current?.scrollIntoView({ behavior: 'smooth' });
            path === '/profile-visibilty' &&
                ProfileVisibilityRef.current?.scrollIntoView({ behavior: 'smooth' });
            path === '/social-authentication' &&
                SocialAuthRef.current?.scrollIntoView({ behavior: 'smooth' });
            path === '/subscription-management' &&
                SubScriptionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location.pathname]);

    useEffect(() => {
        const timeout = setTimeout(() => setIsOpenModal(true), 3000);

        return () => {
            setIsOpenModal(false);
            clearTimeout(timeout);
        };
    }, []);
    const { setIsOpen } = useTour();

    // const navigate=useNavigation()
    const handleDeviceManagement = () => {
        navigate('device-management');
    };

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
                    <span className='text-muted'>{userData?.name + ' ' + userData?.surname}</span>
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
                        {/* Profile Picture */}
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
                                                //srcSet={USERS.JOHN.srcSet}
                                                src={profilePicture || ''}
                                                color={USERS.JOHN.color}
                                                rounded={3}
                                            />
                                        </div>
                                        <div className='col-lg'>
                                            <div className='row g-4'>
                                                <div className='col-auto'>
                                                    <Input
                                                        type='file'
                                                        onChange={handleImage}
                                                        autoComplete='photo'
                                                    />
                                                </div>
                                                <div className='col-auto'>
                                                    <Button
                                                        color='dark'
                                                        onClick={handleApi}
                                                        isLight
                                                        icon='Save'>
                                                        {isLoading && (
                                                            <Spinner isSmall inButton isGrow />
                                                        )}
                                                        Save Image
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
                        {/* Personal Information */}
                        <Card ref={verificationRef}>
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
                                                autoComplete='userName'
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
                                                autoComplete='userName'
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
                        {/* Contact Information */}
                        <Card ref={ChangePasswordRef}>
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
                            <CardHeader ref={ProfileVisibilityRef}>
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
                                                    onChange={pswformik.handleChange}
                                                    value={pswformik.values.currentPassword}
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
                                                    onChange={pswformik.handleChange}
                                                    onBlur={pswformik.handleBlur}
                                                    value={pswformik.values.newPassword}
                                                    isValid={pswformik.isValid}
                                                    isTouched={pswformik.touched.newPassword}
                                                    invalidFeedback={pswformik.errors.newPassword}
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
                                                    onChange={pswformik.handleChange}
                                                    onBlur={pswformik.handleBlur}
                                                    value={pswformik.values.confirmPassword}
                                                    isValid={pswformik.isValid}
                                                    isTouched={pswformik.touched.confirmPassword}
                                                    invalidFeedback={
                                                        pswformik.errors.confirmPassword
                                                    }
                                                    validFeedback='Looks good!'
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className='col-12 text-end'>
                                            <Button
                                                color='primary'
                                                isLight
                                                icon='PublishedWithChanges'
                                                onClick={handleChangePassword}>
                                                {isLoading && <Spinner isSmall inButton isGrow />}
                                                Chnage
                                            </Button>
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
                                <CardLabel icon='VisibilityOff' iconColor='warning'>
                                    <CardTitle>Profile Visibility</CardTitle>
                                    <CardSubTitle>
                                        Change Your Profile's public appearance
                                    </CardSubTitle>
                                </CardLabel>
                            </CardHeader>
                            <CardBody ref={SocialAuthRef}>
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
                        <Card ref={SubScriptionRef}>
                            <CardHeader>
                                <CardLabel icon='Security' iconColor='primary'>
                                    <CardTitle>Social Authentication</CardTitle>
                                    <CardSubTitle>
                                        Menage your social login authentication
                                    </CardSubTitle>
                                </CardLabel>
                            </CardHeader>
                            <CardBody>
                                <SocialAuth />
                            </CardBody>
                        </Card>
                        <Card ref={DeviceRef}>
                            <CardHeader>
                                <CardLabel icon='Subscriptions' iconColor='danger'>
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

                        <Card>
                            <CardHeader>
                                <CardLabel icon='ImportantDevices' iconColor='info'>
                                    <CardTitle>Device Management</CardTitle>
                                    <CardSubTitle>
                                        Check Device's detail and also add more devices
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
                                        onClick={() => navigate('../devices')}>
                                        Device Management
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='col-md-4'>
                        <Card className='shadow-3d-info'>
                            <CardBody>
                                <div className='row g-5'>
                                    <div className='col-12'>
                                        <div className='d-flex justify-content-end'>
                                            <Icon icon='Contacts' size='3x' color='info' />

                                            <div className='ms-1'>
                                                <span className='h5 fw-bold text-info'>
                                                    Student ID
                                                </span>
                                                <br />
                                                <span className=' fw-bolder text-info'>3654</span>
                                            </div>
                                        </div>
                                        <div
                                            className='d-flex align-items-center mt-0 pt-0'
                                            style={{ paddingTop: '-30px' }}>
                                            <div className='flex-shrink-0'>
                                                <Avatar
                                                    src={profilePicture || ''}
                                                    //srcSet={data.srcSet}
                                                    color={data.color}
                                                    isOnline={data.isOnline}
                                                    className='rounded-circle'
                                                />
                                            </div>
                                            <div className='flex-grow-1 ms-4 align-items-center mt-1'>
                                                <div className='h2 fw-bold'>
                                                    <span>
                                                        {`${data.name + ' ' + data.surname}`}
                                                    </span>
                                                </div>
                                                <div className='h5 text-muted'>Founder</div>
                                            </div>
                                        </div>
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
                                                            {`${data.emailAddress}`}
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
                                                            {`${data.name}`}
                                                        </div>
                                                        <div className='text-muted'>
                                                            Social name
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='flex-shrink-0'>
                                                        <Icon icon='Home' size='3x' color='info' />
                                                    </div>
                                                    <div className='flex-grow-1 ms-3'>
                                                        <div className='fw-bold fs-5 mb-0'>
                                                            {`${data.address || 'N/A'}`}
                                                        </div>
                                                        <div className='text-muted'>
                                                            Home Address
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='flex-shrink-0'>
                                                        <Icon icon='Call' size='3x' color='info' />
                                                    </div>
                                                    <div className='flex-grow-1 ms-3'>
                                                        <div className='fw-bold fs-5 mb-0'>
                                                            {`${data.phoneNumber || 'N/A'}`}
                                                        </div>
                                                        <div className='text-muted'>
                                                            Contact Number
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        {/* Complete Your Profile */}
                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between'>
                                    <p>Complete Your Profile</p>
                                    <p className='fw-bold'>90%</p>
                                </div>
                                <Progress value={90} />
                            </CardBody>
                        </Card>
                        {/* About Me */}
                        <Card>
                            <CardHeader>
                                <CardLabel>
                                    <CardTitle>About Me</CardTitle>
                                </CardLabel>
                            </CardHeader>
                            <CardBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                                    vitae velit efficitur nulla dignissim commodo nec vitae odio.
                                    Proin ut risus metus. Aenean dui lectus, laoreet at ornare et,
                                    pellentesque id mauris. Morbi a molestie elit. Nunc eget mi in
                                    lectus rutrum venenatis. Duis dapibus porta justo, nec dapibus
                                    tellus condimentum ultrices. In hac habitasse platea dictumst.
                                    Nulla facilisi. Aenean consequat gravida felis vitae vestibulum.
                                    Suspendisse lacinia ex sed tellus imperdiet, ut lacinia odio
                                    rutrum.
                                </p>
                                <p>
                                    Pellentesque vel sem bibendum, tristique urna a, lacinia tortor.
                                    Suspendisse dapibus lectus id venenatis tincidunt. Proin tempor
                                    lorem non arcu rutrum interdum. Cras sit amet ultricies lacus,
                                    vitae luctus nunc. Sed commodo hendrerit augue, et aliquet sem
                                    commodo in. Pellentesque in diam eros. Sed quis sapien eros. Sed
                                    eleifend at arcu vitae sagittis.
                                </p>
                                <p>
                                    Morbi at fringilla lorem. Nulla eu odio a ante vulputate
                                    finibus. Duis congue finibus nibh fermentum egestas. Maecenas
                                    risus neque, dapibus vitae porttitor vel, efficitur ac dolor.
                                    Sed nec ante ac orci dictum laoreet vitae eget odio. Proin at
                                    consequat ipsum.
                                </p>
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
