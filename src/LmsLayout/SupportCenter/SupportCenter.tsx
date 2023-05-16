import React, { useCallback, useContext, useEffect, useState } from 'react';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { LmsFeatures } from '../../menu';
import classNames from 'classnames';
import { id } from 'date-fns/locale';
import { useFormik } from 'formik';
import Button from '../../components/bootstrap/Button';
import Select from '../../components/bootstrap/forms/Select';
import Input from '../../components/bootstrap/forms/Input';

import { debounce } from '../../helpers/helpers';
import useDarkMode from '../../hooks/useDarkMode';
import data, { CATEGORIES } from '../knowledge/helper/dummyKnowledgeData';
import Alert from '../../components/bootstrap/Alert';
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
import FavouriteVideos from '../Courses/LiveCourses';
import KnowledgeGridPage from '../knowledge/KnowledgeGridPage';
import { Views } from 'react-big-calendar';
import Dropdown, {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from '../../components/bootstrap/Dropdown';
import { UpdateName } from '../../@features/User/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import Ticket from './Tickets';
import { getFaqList } from '../../services/FAQ.service';
import AuthContext from '../../contexts/authContext';

interface HTMLStringProps {
	htmlString: string;
}
const HTMLStringComponent: React.FC<HTMLStringProps> = ({ htmlString }) => {
	const removeHTMLTags = (html: string): string => {
		const tempElement = document.createElement('div');
		tempElement.innerHTML = html;
		return tempElement.textContent || tempElement.innerText || '';
	};

	const codeContent = removeHTMLTags(htmlString);

	return <code>{codeContent}</code>;
};

const SupportCenter = () => {
	const { session } = useContext(AuthContext);
	const { darkModeStatus } = useDarkMode();
	const [filterableData, setFilterableData] = useState(data);
	const onFormSubmit = (values: { category: any; search: any }) => {
		const searchValue = values.search.toString().toLowerCase();
	};

	const formik = useFormik({
		initialValues: {
			search: '',
			category: '',
		},
		onSubmit: onFormSubmit,
		onReset: () => setFilterableData(data),
	});
	const [faqList, setFaqlist] = useState([]);

	useEffect(() => {
		getFaqList(session?.accessToken).then((res) => {
			setFaqlist(res.items);
			console.log(res);
		});
	}, []);

	return (
		<PageWrapper title={LmsFeatures.supportcenter.text}>
			<Page>
				<div className='row'>
					<div className='col-12 my-3'>
						<span className='display-5 fw-bold'>SUPPORT CENTER</span>
					</div>
					<div
						className='col-xxl-6 mx-auto text-center my-5'
						data-tour='knowledge-filter'>
						<form
							className={classNames('row', 'pb-4 px-3 mx-0 g-4', 'rounded-3', [
								`bg-l${darkModeStatus ? 'o25' : '10'}-primary`,
							])}
							onSubmit={formik.handleSubmit}>
							<div className='col-md-5'>
								<Select
									id='category'
									size='lg'
									ariaLabel='Category'
									placeholder='All Category'
									list={Object.keys(CATEGORIES).map((c) => CATEGORIES[c])}
									className={classNames('rounded-1', {
										'bg-white': !darkModeStatus,
									})}
									onChange={(e: { target: { value: any } }) => {
										formik.handleChange(e);

										if (e.target.value)
											debounce(
												() =>
													onFormSubmit({
														...formik.values,
														category: e.target.value,
													}),
												1000,
											)();
									}}
									value={formik.values.category}
								/>
							</div>
							<div className='col-md-5'>
								<Input
									id='search'
									size='lg'
									placeholder='Type your question...'
									className={classNames('rounded-1', {
										'bg-white': !darkModeStatus,
									})}
									onChange={(e: { target: { value: string | any[] } }) => {
										formik.handleChange(e);

										if (e.target.value.length > 2)
											debounce(
												() =>
													onFormSubmit({
														...formik.values,
														search: e.target.value,
													}),
												1000,
											)();

										if (e.target.value.length === 0) formik.resetForm();
									}}
									value={formik.values.search}
								/>
							</div>
							<div className='col-md-2'>
								<Button
									size='lg'
									icon='Search'
									color='primary'
									className='w-100'
									rounded={1}
									onClick={formik.resetForm}
									type='reset'
									isDisable={!(formik.values.search || formik.values.category)}>
									Search
								</Button>
							</div>
						</form>
					</div>
				</div>

				<Card hasTab>
					<CardTabItem id='overview' title='OVERVIEW' icon='Shop'>
						<div className='row'>
							<div className='col col-12 col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-4'>
								<Card
									className='rounded-2'
									tag='form'
									onSubmit={formik.handleSubmit}>
									<CardHeader>
										<CardLabel icon='HolidayVillage'>
											<CardTitle>Popular Tickets</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardFooter>
										<CardFooterRight>
											<Button
												type='submit'
												color='info'
												icon='ArrowForwardIos'>
												Support
											</Button>
										</CardFooterRight>
									</CardFooter>
								</Card>
							</div>
							<div className='col col-12 col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-4'>
								<Card
									className='rounded-2'
									tag='form'
									onSubmit={formik.handleSubmit}>
									<CardHeader>
										<CardLabel icon='LiveHelp'>
											<CardTitle>Faq</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardFooter>
										<CardFooterRight>
											<Button
												type='submit'
												color='info'
												icon='ArrowForwardIos'>
												Full Faq
											</Button>
										</CardFooterRight>
									</CardFooter>
								</Card>
							</div>
							<div className='col col-12 col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-4'>
								<Card
									className='rounded-2'
									tag='form'
									onSubmit={formik.handleSubmit}>
									<CardHeader>
										<CardLabel icon='MenuBook'>
											<CardTitle>Tutorials</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardFooter>
										<CardFooterRight>
											<Button
												type='submit'
												color='info'
												icon='ArrowForwardIos'>
												All Tutorials
											</Button>
										</CardFooterRight>
									</CardFooter>
								</Card>
							</div>
						</div>
					</CardTabItem>
					<CardTabItem id='tickets' title='TICKETS' icon='LibraryMusic'>
						<Ticket />
					</CardTabItem>
					<CardTabItem id='knowladge' title='Knowladge Base' icon='AutoStories'>
						<KnowledgeGridPage />
					</CardTabItem>
					<CardTabItem id='faq' title='FAQ' icon='PictureAsPdf'>
						{faqList.map((f: any, k) => (
							<Dropdown key={k} className='mb-3 mx-1'>
								<DropdownToggle>
									<Button color='primary' isLight icon='view_agenda'>
										<HTMLStringComponent htmlString={f.question} />
									</Button>
								</DropdownToggle>
								<DropdownMenu isCloseAfterLeave>
									<DropdownItem>
										<HTMLStringComponent htmlString={f.answer} />
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						))}
					</CardTabItem>
					{/* <CardTabItem
						id='contentUs'
						title='CONTENT US'
						icon='PictureAsPdf'>

                        </CardTabItem> */}
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default SupportCenter;
