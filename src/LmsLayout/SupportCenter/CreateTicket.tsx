import React, { useState } from 'react';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import InputGroup, { InputGroupText } from '../../components/bootstrap/forms/InputGroup';
import Textarea from '../../components/bootstrap/forms/Textarea';
import Label from '../../components/bootstrap/forms/Label';
import Input from '../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import useDarkMode from '../../hooks/useDarkMode';
import classNames from 'classnames';

const CreateTicket = () => {
	const { themeStatus } = useDarkMode();

	// const [category,setCategory]=useState()

	return (
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
					/>
				</FormGroup>
				<FormGroup className='my-4'>
					<div className='d-flex justify-content-between'>
						<div className='w-100' style={{ marginRight: '8px' }}>
							<Label htmlFor='category'>Category</Label>
							<select
								className=' form-select form-control '
								data-kt-select2='true'
								data-placeholder='Select option'
								data-allow-clear='true'
								defaultValue='Select Category'
								disabled={false}>
								<option value='Category 1'>Category 1</option>
								<option value='Category 2'>Category 2</option>
								<option value='Category 3'>Category 3</option>
							</select>
						</div>
						<div className='w-100' style={{ marginLeft: '8px' }}>
							<Label htmlFor='Priority'>Priority</Label>
							<select
								className=' form-select form-control '
								data-kt-select2='true'
								data-placeholder='Select option'
								data-allow-clear='true'
								defaultValue='Select priority'
								disabled={false}>
								<option value='priority 1'>priority 1</option>
								<option value='priority 2'>priority 2</option>
								<option value='priority 3'>priority 3</option>
							</select>
						</div>
					</div>
				</FormGroup>
				<FormGroup className='mt-4'>
					<Label htmlFor='Description'>Description</Label>
					<Textarea id='Description' ariaLabel='With textarea' />
				</FormGroup>
				<div className='d-flex justify-content-end mt-3'>
					<Button
						isOutline={!themeStatus}
						color='brand'
						className={classNames('text-nowrap', {
							'border-light': !themeStatus,
						})}
						icon='Save'>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CreateTicket;
