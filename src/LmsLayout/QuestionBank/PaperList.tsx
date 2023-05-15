import React, { FC, useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import { IFavouriteList, getFavouriteList } from '../../services/favourits';
import AuthContext from '../../contexts/authContext';
import { LmsFeatures } from '../../menu';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { useNavigate } from 'react-router-dom';

const PaperList = () => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const { session } = useContext(AuthContext);
	// BEGIN :: Upcoming Events
	const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);
	const [data, setData] = useState<IFavouriteList[]>([]);
	const handleUpcomingDetails = () => {
		setUpcomingEventsInfoOffcanvas(!upcomingEventsInfoOffcanvas);
	};

	const navigate = useNavigate();

	const handleUpcomingEdit = () => {};
	// END :: Upcoming Events
	useEffect(() => {
		const fetchData = async () => {
			const d = await getFavouriteList(1, session?.accessToken);
			setData(d as IFavouriteList[]);
		};
		fetchData();
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const { items, requestSort, getClassNamesFor } = useSortableData(data);

	return (
		<>
			<PageWrapper title={LmsFeatures.mcqbank.text}>
				<Page>
					<Card>
						<CardHeader borderSize={1}>
							<CardLabel icon='BookmarkAdd' iconColor='info'>
								<CardTitle>Tests Arranged For You </CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='h-100 table-responsive'>
							<table className='table table-modern'>
								<thead>
									<tr>
										<td style={{ width: 60 }} />
										<th>Mode</th>
										<th
											onClick={() => requestSort('date')}
											className='cursor-pointer text-decoration-underline'>
											Attempted On
											<Icon
												size='lg'
												className={getClassNamesFor('date')}
												icon='FilterList'
											/>
										</th>
										<th>Status</th>
										<th>#QS</th>
									</tr>
								</thead>
								<tbody>
									{dataPagination(items || [], currentPage, perPage).map(
										(item) => (
											<tr key={item.objectID}>
												<td>
													<Button
														isOutline={!darkModeStatus}
														color='dark'
														isLight={darkModeStatus}
														className={classNames({
															'border-light': !darkModeStatus,
														})}
														icon='Info'
														onClick={handleUpcomingDetails}
														aria-label='Detailed information'
													/>
												</td>
												<td>
													<div className='d-flex align-items-center'>
														<span
															className={classNames(
																'badge',
																'border border-2',
																[`border-${themeStatus}`],
																'rounded-circle',
																'bg-success',
																'p-2 me-2',
															)}></span>
														<span className='text-nowrap'>
															{dayjs(`${item.created}`).format(
																'MMM Do YYYY h:mm a',
															)}
														</span>
													</div>
												</td>
												<td>
													<div>
														<div>{item.name}</div>
														<div className='small text-muted'>
															{item.parentName}
														</div>
													</div>
												</td>
												<td>
													<Button
														isOutline={!darkModeStatus}
														color='info'
														isLight={darkModeStatus}
														className={classNames('text-nowrap', {
															'border-light': !darkModeStatus,
														})}
														icon='PlayArrow'
														onClick={handleUpcomingEdit}>
														Play
													</Button>
													<Button
														isOutline={!darkModeStatus}
														color='danger'
														isLight={darkModeStatus}
														className={classNames('text-nowrap', {
															'border-light': !darkModeStatus,
														})}
														icon='Delete'
														onClick={handleUpcomingEdit}>
														Remove
													</Button>
												</td>
											</tr>
										),
									)}
								</tbody>
							</table>
						</CardBody>
						<PaginationButtons
							data={items}
							label='items'
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
							perPage={perPage}
							setPerPage={setPerPage}
						/>
					</Card>
				</Page>
			</PageWrapper>
		</>
	);
};

export default PaperList;
