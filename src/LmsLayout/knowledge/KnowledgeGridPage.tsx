import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import Select from '../../components/bootstrap/forms/Select';
import Card, { CardBody, CardTitle } from '../../components/bootstrap/Card';
import Badge from '../../components/bootstrap/Badge';

import data, { CATEGORIES, TTags } from './helper/dummyKnowledgeData';
import { demoPagesMenu } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import useTourStep from '../../hooks/useTourStep';
import { TColor } from '../../type/color-type';
import { getKnoladgeBaseList } from '../../services/KnowladgeBase.service';
import AuthContext from '../../contexts/authContext';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { UpdatekBList } from '../../@features/KnowladgeBase/KbSlice';
import { BASE_URL } from '../../common/data/constants';

interface IItemProps {
	id: string | number;
	image: string;
	title: string;
	description: string;
	tags: TTags[];
	color: TColor;
}
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

	return <code className='text-decoration-none'>{codeContent}</code>;
};

const Item: FC<IItemProps> = ({ id, image, title, description, tags, color }) => {
	useTourStep(15);
	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	const handleOnClick = useCallback(
		() => navigate(`../${demoPagesMenu.knowledge.subMenu.itemID.path}/${id}`),
		[navigate, id],
	);
	let kbState = useSelector((store: RootState) => store.knowladgeBaseStore);

	// const thumbnailPath = kbState.kBList.thumbnail;
	// const normalizedPath = thumbnailPath.replace(/\\/g, '/').replace(/^\//, '');
	// const absoluteURL = `${BASE_URL}/${normalizedPath}`;
	return (
		<Card
			className='cursor-pointer shadow-3d-primary shadow-3d-hover'
			onClick={handleOnClick}
			data-tour={title}>
			<CardBody>
				<div
					className={classNames(
						'ratio ratio-1x1',
						'rounded-2',
						`bg-l${darkModeStatus ? 'o25' : '10'}-${color}`,
						'mb-3',
					)}>
					<img
						src={image}
						alt=''
						width='100%'
						height='auto'
						className='object-fit-contain p-3'
					/>
				</div>
				<CardTitle>{title}</CardTitle>
				<p className='text-muted truncate-line-2'>
					<HTMLStringComponent htmlString={description} />
				</p>
				<div className='row g-2'>
					{!!tags &&
						// eslint-disable-next-line react/prop-types
						tags.map((tag) => (
							<div key={tag.text} className='col-auto'>
								<Badge isLight color={tag.color} className='px-3 py-2'>
									{tag.text}
								</Badge>
							</div>
						))}
				</div>
			</CardBody>
		</Card>
	);
};

const KnowledgeGridPage = () => {
	const { darkModeStatus } = useDarkMode();
	const { session } = useContext(AuthContext);
	const [filterableData, setFilterableData] = useState(data);
	const [knowladgeBaseList, setKnowladgeBaseList] = useState([]);
	const dispatch = useDispatch<AppDispatch>();
	let kbState = useSelector((store: RootState) => store.knowladgeBaseStore);

	useEffect(() => {
		setKnowladgeBaseList(kbState.kBList);
	}, [kbState]);

	useEffect(() => {
		getKnoladgeBaseList(session?.accessToken).then((res) => {
			dispatch(UpdatekBList(res.items));
			console.log(res.items);
		});
	}, []);

	const searchAndFilterData = (searchValue: string, category: string) => {
		let tempData = data;

		if (category)
			tempData = data.filter((item) =>
				item.categories.find((categ) => categ.value === category),
			);

		return tempData.filter((item) => {
			return (
				item.title.toLowerCase().includes(searchValue) ||
				item.description.toLowerCase().includes(searchValue) ||
				item.content.toLowerCase().includes(searchValue) ||
				item.categories.find((categ) => categ.text.toLowerCase().includes(searchValue)) ||
				item.tags.find((tag) => tag.text.toLowerCase().includes(searchValue))
			);
		});
	};

	const debounce = (func: any, wait: number | undefined) => {
		let timeout: string | number | NodeJS.Timeout | undefined;

		return function executedFunction(...args: any[]) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	};

	const onFormSubmit = (values: { category: any; search: any }) => {
		const searchValue = values.search.toString().toLowerCase();
		const newData = searchAndFilterData(searchValue, values.category);

		if (!values.search && !values.category) {
			setFilterableData(data);
		} else {
			setFilterableData(newData);
		}
	};

	const formik = useFormik({
		initialValues: {
			search: '',
			category: '',
		},
		onSubmit: onFormSubmit,
		onReset: () => setFilterableData(data),
	});

	return (
		<PageWrapper title={demoPagesMenu.knowledge.subMenu.grid.text}>
			<Page>
				<div className='row'>
					<div className='col-12 text-center my-5'>
						<span className='display-5 fw-bold'>Hello, May I help you?</span>
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
									isDisable={!(formik.values.search || formik.values.category)}
								/>
							</div>
						</form>
					</div>
				</div>
				<div className='row mb-5'>
					{filterableData.map((item) => (
						<div key={item.id} className='col-xl-3 col-lg-4 col-md-6'>
							{/* eslint-disable-next-line react/jsx-props-no-spreading */}
							<Item {...item} />
						</div>
					))}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default KnowledgeGridPage;
