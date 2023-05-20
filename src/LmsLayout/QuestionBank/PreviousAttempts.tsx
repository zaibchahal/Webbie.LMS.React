import React, { FC, useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle, } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import { IResultProp, getResultList } from '../../services/QBankService';
import AuthContext from '../../contexts/authContext';
import { LmsFeatures } from '../../menu';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { useNavigate } from 'react-router-dom';

const QuestionBank = () => {
    const { themeStatus, darkModeStatus } = useDarkMode();
    const { session } = useContext(AuthContext);
    const [data, setData] = useState<IResultProp[]>([]);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const d = await getResultList(session?.userId, session?.accessToken);
            setData(d as IResultProp[]);
        };
        fetchData();
    }, [session?.userId, session?.accessToken]);


    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(PER_COUNT['10']);
    const { items, requestSort, getClassNamesFor } = useSortableData(data);

    return (
        <>
            <PageWrapper title={LmsFeatures.mcqbank.text}>
                <Page>
                    <Card >
                        <CardHeader borderSize={1}>
                            <CardLabel icon='BookmarkAdd' iconColor='info'>
                                <CardTitle>Previous Attempts </CardTitle>
                            </CardLabel>
                            <CardActions>
                                <Button
                                    color='info'
                                    icon='Plus'
                                    isLight
                                    onClick={() => navigate(`../${LmsFeatures.mcqbank.subMenu.createtest.path}`)}
                                >
                                    Create New Test
                                </Button>
                            </CardActions>
                        </CardHeader>
                        <CardBody className='h-100 table-responsive'>
                            <table className='table table-modern'>
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>Mode</th>
                                        <th
                                            onClick={() => requestSort('date')}
                                            className='cursor-pointer text-decoration-underline'>
                                            Attempted On{' '}
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
                                    {dataPagination(items || [], currentPage, perPage).map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div>
                                                    {!item.isComplete && (
                                                        <>
                                                            {item.allowReopen || item.questionPaper == null ? (
                                                                <Button isOutline={!darkModeStatus} color='primary' isLight={darkModeStatus}
                                                                    className={classNames({ 'border-light': !darkModeStatus, })}
                                                                    onClick={() => navigate('/mcq-bank/test/' + item.id)}
                                                                    icon='PlayArrow'
                                                                    aria-label='Detailed information'
                                                                />
                                                            ) : null}
                                                        </>
                                                    )}

                                                    {item.isComplete && (item.answerAt == null || item.answerAt < new Date()) && (
                                                        <>
                                                            <Button isOutline={!darkModeStatus} color='success' isLight={darkModeStatus}
                                                                className={classNames({ 'border-light': !darkModeStatus, })}
                                                                onClick={() => navigate('/mcq-bank/answers/' + item.id)}
                                                                icon='Preview'
                                                                aria-label='View Answers'
                                                            />
                                                            <Button isOutline={!darkModeStatus} color='success' isLight={darkModeStatus}
                                                                className={classNames({ 'border-light': !darkModeStatus, })}
                                                                icon='PieChart'
                                                                onClick={() => navigate('/mcq-bank/analysis/' + item.id)}
                                                                aria-label='View Analysis'
                                                            />
                                                        </>
                                                    )}

                                                    {/*{item.questionPaper == null && (*/}

                                                    {/*    <Button isOutline={!darkModeStatus} color='danger' isLight={darkModeStatus}*/}
                                                    {/*        className={classNames({ 'border-light': !darkModeStatus, })}*/}
                                                    {/*        icon='Delete'*/}
                                                    {/*        aria-label='Delete'*/}
                                                    {/*    />*/}
                                                    {/*)}*/}
                                                </div>
                                            </td>
                                            <td>{item.questionPaper ?? item.mode}</td>
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
                                                        )}>
                                                    </span>
                                                    <span className='text-nowrap'>
                                                        {dayjs(`${item.creationTime}`).format(
                                                            'MMM DD YYYY h:mm a',
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>{item.isComplete ? (<span className="badge bg-primary">Completed</span>) : (<span className="badge bg-danger">Incomplete</span>)}</td>
                                            <td>{item.questionCount}</td>
                                        </tr>
                                    ))}
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

export default QuestionBank;
