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
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import Spinner from '../../components/bootstrap/Spinner';
import SubHeader, {
	SubHeaderLeft,
	SubheaderSeparator,
	SubHeaderRight,
} from '../../layout/SubHeader/SubHeader';
import Icon from '../../components/icon/Icon';
import { useState } from 'react';
import Question from './Question';
const Test = () => {
	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = useState(null);
	const [showAnswer, setShowAnswer] = useState(false);

	const options = [
		{ id: 1, text: 'Option 1', isCorrect: false },
		{ id: 2, text: 'Option 2', isCorrect: true },
		{ id: 3, text: 'Option 3', isCorrect: false },
		{ id: 4, text: 'Option 4', isCorrect: false },
	];

	const handleOptionSelect = (optionId: any) => {
		setSelectedOption(optionId);
	};

	const showAnswerResult = () => {
		setShowAnswer(true);
	};

	return (
		<>
			<PageWrapper title='Test'>
				<Page>
					<SubHeader>
						<SubHeaderLeft>
							<Breadcrumb
								list={[
									{ title: 'Create Test', to: '../mcq-bank/create-test' },
									{ title: 'Edit User', to: '/' },
								]}
							/>
							<SubheaderSeparator />
							{/* <span className='text-muted'>
								{userData?.name + ' ' + userData?.surname}
							</span> */}
						</SubHeaderLeft>
					</SubHeader>
					<Card>
						<CardHeader borderSize={1}>
							<CardLabel icon='LocalPolice' iconColor='primary'>
								<CardTitle>Question Paper</CardTitle>
								{/* <CardSubTitle>Select a test mode</CardSubTitle> */}
							</CardLabel>
						</CardHeader>
						<CardBody className='py-4'>
							<div className='row'>
								<div className='col col-2'>
									<div
										className=''
										style={{ height: '70vh', overflowY: 'scroll' }}>
										<div>
											{[
												1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
												16, 17, 18, 19,
											].map((i, k) => (
												<>
													<div className='px-2 py-4 d-flex justify-content-center align-items-center'>
														{i}
													</div>
												</>
											))}
										</div>
									</div>
								</div>
								<div className='col col-10'>
									<SubHeader>
										<SubHeaderLeft>
											<Icon icon='DateRange' size='2x' color='primary' />
											<SubheaderSeparator />
											<span>1</span>
											<span>-</span>
											<span>40</span>
										</SubHeaderLeft>
										<SubHeaderRight>
											<div className='bg-light p-2'>
												<Icon icon='FastRewind' size='2x' color='primary' />
											</div>
											<div className='bg-light p-2'>
												<Icon
													icon='FastForward'
													size='2x'
													color='primary'
												/>
											</div>
											<div className='bg-light p-2'>
												<Icon icon='Flag' size='2x' color='primary' />
											</div>
											<div className='bg-light p-2'>
												<Icon icon='Fullscreen' size='2x' color='primary' />
											</div>
										</SubHeaderRight>
									</SubHeader>
									<Question />
								</div>
							</div>
						</CardBody>
					</Card>
				</Page>
			</PageWrapper>
		</>
	);
};

export default Test;
