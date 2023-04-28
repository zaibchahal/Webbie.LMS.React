import React, { useState } from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../menu';
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
	return (
		<div>
			<PageWrapper title={demoPagesMenu.editPages.subMenu.editModern.text}>
				
			</PageWrapper>
		</div>
	);
};

export default DeviceManagement;
