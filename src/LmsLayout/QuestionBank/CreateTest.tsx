import { useNavigate } from 'react-router-dom';
import Button from '../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { LmsFeatures } from '../../menu';
import CommonDesc from '../../common/other/CommonDesc';
import Checks, { ChecksGroup } from '../../components/bootstrap/forms/Checks';
import Badge from '../../components/bootstrap/Badge';
import './style.css';
const CreateTest = () => {
	const navigate = useNavigate();

	return (
		<>
			<PageWrapper title={LmsFeatures.mcqbank.subMenu.createtest.text}>
				<Page>
					<Card>
						<CardHeader borderSize={1}>
							<CardLabel icon='LocalPolice' iconColor='primary'>
								<CardTitle>Test Mode</CardTitle>
								<CardSubTitle>Select a test mode</CardSubTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='p-4'>
							<div className='form-check form-check-inline fs-4 mr-4'>
								<label className='form-check-label'>
									<input
										className='form-check-input border-black'
										defaultChecked
										type='radio'
										name='TestMode'
										value='Tutor'
									/>
									Tutor
								</label>
							</div>
							<div className='form-check form-check-inline fs-4 mr-4'>
								<label className='form-check-label'>
									<input
										className='form-check-input border-black'
										type='radio'
										name='TestMode'
										value='Exam'
									/>
									Exam
								</label>
							</div>
						</CardBody>
					</Card>
					<Card>
						<CardHeader borderSize={1}>
							<CardLabel icon='LocalPolice' iconColor='primary'>
								<CardTitle>Question Mode </CardTitle>
								<CardSubTitle>Select a Question mode</CardSubTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='p-4'>
							<div className='form-check form-check-inline fs-4 mr-4'>
								<label className='form-check-label'>
									<input
										className='form-check-input border-black'
										type='radio'
										name='QuestionMode'
										value='Unused'
									/>
									Unused
									<span className='badge  badge-sm'>0</span>
								</label>
							</div>
							<div className='form-check form-check-inline fs-4 mr-4'>
								<label className='form-check-label'>
									<input
										className='form-check-input border-black'
										type='radio'
										name='QuestionMode'
										value='Incorrect'
									/>
									Incorrect
									<span className='badge  badge-sm'>0</span>
								</label>
							</div>
							<div className='form-check form-check-inline fs-4 mr-4'>
								<label className='form-check-label'>
									<input
										className='form-check-input border-black'
										type='radio'
										name='QuestionMode'
										value='Marked'
									/>
									Marked
									<span className='badge  badge-sm'>0</span>
								</label>
							</div>
							<div className='form-check form-check-inline fs-4 mr-4'>
								<label className='form-check-label'>
									<input
										className='form-check-input border-black'
										type='radio'
										name='QuestionMode'
										value='All'
									/>
									All
									<span className='badge  badge-sm'>0</span>
								</label>
							</div>
						</CardBody>
					</Card>
					<Card>
						<CardHeader borderSize={1}>
							<CardLabel>
								<CardTitle>
									<label className='form-check-label fs-4'>&nbsp; Systems</label>
								</CardTitle>
								<CardSubTitle>Select systems</CardSubTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='p-4'>
							<div className='row'>
								<div className='col-md-6 mb-4'>
									<div className='form-check form-check-inline fs-4'>
										<label className='form-check-label'>
											<input
												className='form-check-input border-black'
												type='radio'
												data-unused='351'
												data-incorrect='0'
												data-marked='0'
												data-all='351'
												name='Systems'
												value='25'
											/>
											Gynaecology &amp; Obstetrics
											<span className='badge  badge-sm'>351</span>
										</label>
									</div>
								</div>
								<div className='col-md-6 mb-4'>
									<div className='form-check form-check-inline fs-4'>
										<label className='form-check-label'>
											<input
												className='form-check-input border-black'
												type='radio'
												data-unused='338'
												data-incorrect='0'
												data-marked='0'
												data-all='338'
												name='Systems'
												value='28'
											/>
											Pharma
											<span className='badge  badge-sm'>338</span>
										</label>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
					<Card>
						<CardHeader borderSize={1}>
							<CardLabel icon='LocalPolice' iconColor='primary'>
								<CardTitle>No. of Questions </CardTitle>
								<CardSubTitle>Select a Question mode</CardSubTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='p-4'>
							<div className='d-flex'>
								<input
									className='form-control'
									id='maxQPerBlock'
									style={{ width: '60px' }}
									type='text'
									placeholder='0'
								/>
								<label className='mt-2 '>
									&emsp;&emsp; Max allowed per block
									<span className='badge  badge-sm'>40</span>
								</label>
							</div>
						</CardBody>
					</Card>
					<Card>
						<CardBody className='p-4'>
							<button className='btn btn-large btn-primary' id='btnGenerate' disabled>
								{' '}
								Generate Test{' '}
							</button>
						</CardBody>
					</Card>
				</Page>
			</PageWrapper>
		</>
	);
};

export default CreateTest;
