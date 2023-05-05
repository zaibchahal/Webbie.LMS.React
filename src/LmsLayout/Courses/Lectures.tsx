import React, { useState } from 'react';
import Card, {
	CardHeader,
	CardLabel,
	CardTitle,
	CardSubTitle,
	CardBody,
} from '../../components/bootstrap/Card';
import Icon from '../../components/icon/Icon';
import Badge from '../../components/bootstrap/Badge';
import useDarkMode from '../../hooks/useDarkMode';
import FormGroup from '../../components/bootstrap/forms/FormGroup';

const Lectures = (props: { mainHead: string; totallectures: number; totaltime: string }) => {
	const mainHead = props.mainHead;
	const totallectures = props.totallectures;
	const totaltime = props.totaltime;

	const { darkModeStatus } = useDarkMode();
	const [show, setShow] = useState(false);
	const [check, setCheck] = useState(false);

	return (
		<div>
			<div className='mt-3'>
				<div className='d-flex justify-content-between align-items-start'>
					<div>
						<CardTitle>{mainHead}</CardTitle>
						<div>
							<div className='row g-2 mb-3'>
								<div className='col-auto'>
									<Badge color={darkModeStatus ? 'light' : 'dark'} isLight>
										<Icon
											style={{
												fontSize: 'calc(1vh + 1vw)',
											}}
											icon='SlowMotionVideo'
										/>
										Lecture({totallectures})
									</Badge>
								</div>
								<div className='col-auto'>
									<Badge color={darkModeStatus ? 'light' : 'dark'} isLight>
										<Icon
											style={{
												fontSize: 'calc(1vh + 1vw)',
											}}
											className='fw-bold'
											icon='AlarmOn'
										/>
										{totaltime}
									</Badge>
								</div>
							</div>
						</div>
					</div>
					<Icon
						style={{
							fontSize: 'calc(3vh + 1vw)',
						}}
						className='fw-bold'
						icon={show ? 'ArrowDropUp' : 'ArrowDropDown'}
						onClick={() => setShow(!show)}
					/>
				</div>
				<div>
					{show && (
						<>
							<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom'></div>
							<div className='d-flex justify-content-start align-items-center'>
								<FormGroup id='eventAllDay'>
									<input
										type='checkbox'
										name=''
										checked={check}
										onChange={() => setCheck(!check)}
										id=''
									/>
								</FormGroup>
								<a href='#' className='mt-4 text-decoration-none mx-2'>
									<div className='col-auto text-decoration-none text-bolder'>
										<Icon
											style={{
												fontSize: 'calc(1vh + 1vw)',
											}}
											icon='SlowMotionVideo'
										/>
										REGULATION OF ARTERIAL PRESSURE
									</div>
									<div className='col-auto text-muted mt-1'>
										<Icon
											style={{
												fontSize: 'calc(1vh + 1vw)',
											}}
											className='fw-bold'
											icon='AlarmOn'
										/>
										34 Mins
									</div>
								</a>
								<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom'></div>
							</div>
							<div className='d-flex justify-content-start align-items-center'>
								<FormGroup id='eventAllDay'>
									<input
										type='checkbox'
										name=''
										checked={check}
										onChange={() => setCheck(!check)}
										id=''
									/>
								</FormGroup>
								<a href='#' className='mt-4 text-decoration-none mx-2'>
									<div className='col-auto text-decoration-none text-bolder'>
										<Icon
											style={{
												fontSize: 'calc(1vh + 1vw)',
											}}
											icon='SlowMotionVideo'
										/>
										VASCULAR FUNCTION CURVE
									</div>
									<div className='col-auto text-muted mt-1'>
										<Icon
											style={{
												fontSize: 'calc(1vh + 1vw)',
											}}
											className='fw-bold'
											icon='AlarmOn'
										/>
										56 Mins
									</div>
								</a>
							</div>
							<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom'></div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Lectures;
