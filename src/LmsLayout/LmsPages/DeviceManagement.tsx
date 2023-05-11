import React, { useState } from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { LmsUserManu, demoPagesMenu } from '../../menu';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import Button from '../../components/bootstrap/Button';
import Spinner from '../../components/bootstrap/Spinner';
import SubHeader, {
	SubHeaderLeft,
	SubheaderSeparator,
	SubHeaderRight,
} from '../../layout/SubHeader/SubHeader';
import dayjs, { Dayjs } from 'dayjs';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import useDarkMode from '../../hooks/useDarkMode';
import { useFormik } from 'formik';
import validate from '../../pages/presentation/demo-pages/helper/editPagesValidate';
import { Calendar as DatePicker } from 'react-date-range';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Label from '../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../components/bootstrap/forms/Checks';
import Badge from '../../components/bootstrap/Badge';
import Progress from '../../components/bootstrap/Progress';
import { TColor } from '../../type/color-type';
import classNames from 'classnames';
import Dropdown, {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from '../../components/bootstrap/Dropdown';

const DeviceManagement = () => {
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

	interface ITodoListItem {
		id?: string | number;
		status?: boolean;
		title?: string | number;
		subtitle?: string;
		type?: 'mobile' | 'laptop' | 'tab';
	}

	const [list, setList] = useState<ITodoListItem[]>([
		{
			id: 1,
			status: true,
			title: 'Laptop / Desktop PC',
			subtitle: '(Windows NT 10.0; Win64; x64)',
			type: 'laptop',
		},
		{
			id: 2,
			status: true,
			title: 'Mobile Device ( iOS or Android )',
			subtitle: '(Linux; Android 10; TECNO LC8)',
			type: 'mobile',
		},
		{
			id: 3,
			status: false,
			title: 'Laptop / Desktop PC',
			subtitle: '(Windows NT 10.0; Win64; x64)',
			type: 'laptop',
		},
		{
			id: 4,
			status: false,
			title: 'Laptop / Desktop PC',
			subtitle: '(Windows NT 10.0; Win64; x64)',
			type: 'laptop',
		},
		{
			id: 5,
			status: false,
			title: 'Tab / iPad',
			subtitle: '(Win64; x64)',
			type: 'tab',
		},
		{
			id: 6,
			status: false,
			title: 'Laptop / Desktop PC',
			subtitle: '(Windows NT 10.0; Win64; x64)',
			type: 'laptop',
		},
		{
			id: 7,
			status: false,
			title: 'iPad',
			subtitle: '(Win64; x64)',
			type: 'tab',
		},
	]);
	return (
		<PageWrapper title={LmsUserManu.devicemanagement.text}>
			<Card className='h-100'>
				<CardHeader>
					<CardLabel icon='AssignmentTurnedIn' iconColor='primary'>
						<CardTitle tag='h4' className='h5'>
							Device Management - List of Connected Devices
						</CardTitle>
					</CardLabel>
				</CardHeader>
				<CardBody isScrollable>
					<div className='todo h-100'>
						{list.map((i, index) => (
							<div key={index} className='todo-item mb-5 mx-3'>
								<div className='todo-check'>
									<Icon
										icon={
											i.type === 'laptop'
												? 'laptop'
												: i.type === 'tab'
												? 'TabletMac'
												: 'PhoneAndroid'
										}
										color='info'
										// size='3x'
										style={{ marginRight: '12px', fontSize: '42px' }}
									/>
								</div>
								<div className='todo-content'>
									<div className='todo-title text-bolder h5 mt-1 pb-2'>
										{i.title}
									</div>
									{i.subtitle && (
										<div className='todo-subtitle text-muted'>{i.subtitle}</div>
									)}
								</div>
								<div className='todo-extras'>
									<span>
										{/* <Dropdown>
											<DropdownToggle hasIcon={false}>
												<Button color={themeStatus} icon='MoreHoriz' />
											</DropdownToggle>
											<DropdownMenu isAlignmentEnd>
												<DropdownItem>
													<Button
														// onClick={() => removeTodo(index)}
														icon='Delete'>
														Delete
													</Button>
												</DropdownItem>
											</DropdownMenu>
										</Dropdown> */}
										<Button
											color='storybook'
											isLight
											icon='Delete'
											className='d-flex align-items-center mx-3'
											size='lg'
											// onClick={() => setNumberVerification(true)}
										>
											{/* <Icon
												icon='Delete'
												size='2x'
												style={{ marginRight: '12px', color: '#ff4785' }}
											/> */}
											Delete
										</Button>
									</span>
								</div>
							</div>
						))}
					</div>
				</CardBody>
			</Card>
		</PageWrapper>
	);
};

export default DeviceManagement;
