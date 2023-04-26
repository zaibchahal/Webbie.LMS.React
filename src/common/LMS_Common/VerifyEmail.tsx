import React, { useEffect, useState, useRef } from 'react';
import { useTour } from '@reactour/tour';
import { useNavigate } from 'react-router-dom';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import Button from '../../components/bootstrap/Button';
import Logo from '../../components/Logo';
import Img from '../../assets/img/wanna/susy/susy9.png';
import Icon from '../../components/icon/Icon';
import WebbieLogo from '../../components/WebbieLogo';
import Black_WebbieLogo from '../../components/Black_WebbieLogo';

const VerifyEmail = () => {
	const navigate = useNavigate();
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const [values, setValues] = useState<string[]>(Array(6).fill(''));

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
		if(index===6){
			// const { value } = event.target;
			// const newValues = [...values];
			// newValues[index] = value;
			// setValues(newValues);	
			console.log('ok')
		}
		console.log(index);
		const { value } = event.target;
		const newValues = [...values];
		newValues[index-1] = value;
		setValues(newValues);
		
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
		if (event.key === 'Backspace' && !values[index] && index > 0) {
			event.preventDefault();
			const newValues = [...values];
			newValues[index - 1] = '';
			setValues(newValues);
			const prevInput = document.getElementById(`verification-input-${index - 1}`);
			if (prevInput) prevInput.focus();
		} else if (/^\d$/.test(event.key) && index < 5) {
			const nextInput = document.getElementById(`verification-input-${index + 1}`);
			if (nextInput) nextInput.focus();
		} else if (/^\d$/.test(event.key) && index === 5) {
			event.preventDefault();
			console.log(values.join(''));
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				<p className='pt-2 mx-3'>Verify Your Email Address</p>

				<div>
					<Button
						color='brand'
						isLight
						icon='PublishedWithChanges'
						onClick={() => setIsOpenModal(true)}>
						Verify
					</Button>
				</div>
			</div>
			{isOpenModal && (
				<Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} titleId='tour-title'>
					<ModalHeader setIsOpen={setIsOpenModal}>
						<ModalTitle id='tour-title' className='d-flex align-items-center'>
							<Black_WebbieLogo height={28} /> <span className='ps-2'>Assistant</span>
							<span className='ps-2'>
								<Icon icon='Verified' color='info' />
							</span>
						</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<div className='row'>
							<div className='col-md-4'>
								<img src={Img} alt='' width='70%' />
							</div>
							<div className='col-md-8 d-flex align-items-center'>
								<div>
									{/* <h2>Hi 👋🏻, I'm Susy.</h2> */}
									<div className='verification-field'>
										<h2>Enter Verification Code</h2>
										<p>
											We've sent a verification code to your email. Please
											enter it below:
										</p>
										<div className='code-input-container mt-2 mb-3'>
											{values.map((value, index) => (
												<input
													style={{ maxWidth: '35px', maxHeight: '30px' }}
													key={index}
													type='text'
													maxLength={1}
													value={value}
													id={`verification-input-${index}`}
													onChange={(event) => handleChange(event, index)}
													onKeyDown={(event) =>
														handleKeyDown(event, index)
													}
												/>
											))}
											<Button
												color='brand'
												isLight
												icon='PublishedWithChanges'
												className=' mx-3'
												// onClick={() => setNumberVerification(true)}
											></Button>
										</div>
										<p>
											Didn't receive the code? <a href='#'>Resend code</a>
										</p>
									</div>
									<div className='d-flex justify-content-center'></div>
								</div>
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
					</ModalFooter>
				</Modal>
			)}
		</>
	);
};

export default VerifyEmail;
