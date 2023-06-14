import React, { FC, useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle, } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import { IQuestionPapersProp, getQuestionPapers, createTestResultByPaper } from '../../services/QBankService';

import { LmsFeatures } from '../../menu';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { useNavigate } from 'react-router-dom';

const PaperList = () => {
    const { themeStatus, darkModeStatus } = useDarkMode();
    const [data, setData] = useState<IQuestionPapersProp[]>([]);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const d = await getQuestionPapers();
            setData(d as IQuestionPapersProp[]);
        };
        fetchData();
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(PER_COUNT['10']);
    const { items, requestSort, getClassNamesFor } = useSortableData(data);

    const handleGenerateTest = (paperid: number) => {
        const postData = async () => {
            const resultID = await createTestResultByPaper(paperid);
            navigate("/mcq-bank/test/" + resultID);
        };
        postData();
    }

    return (
        <>
            <PageWrapper title={LmsFeatures.mcqbank.text}>
                <Page>
                    <Card >
                        <CardHeader borderSize={1}>
                            <CardLabel icon='BookmarkAdd' iconColor='info'>
                                <CardTitle>Tests Arranged For You </CardTitle>
                            </CardLabel>
                        </CardHeader>
                        <CardBody className='h-100 table-responsive'>
                            <table className='table table-modern'>
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>Paper Title</th>
                                        <th
                                            onClick={() => requestSort('date')}
                                            className='cursor-pointer text-decoration-underline'>
                                            Expire At{' '}
                                            <Icon
                                                size='lg'
                                                className={getClassNamesFor('date')}
                                                icon='FilterList'
                                            />
                                        </th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPagination(items || [], currentPage, perPage).map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div>
                                                    {item.expiryDT < new Date() ? (
                                                        <span className="badge badge-danger badge-lg">Expired</span>
                                                    ) : item.startDT > new Date() ? (
                                                        <>
                                                            <span className="badge bg-success badge-lg" >Strat-At</span>
                                                            <span className="badge bg-light text-muted">
                                                                {item.startDT.toLocaleDateString()} &emsp;
                                                                {item.startDT.toLocaleTimeString()}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <Button isOutline={!darkModeStatus} color='primary' isLight={darkModeStatus}
                                                            className={classNames({ 'border-light': !darkModeStatus, })}
                                                            onClick={() => handleGenerateTest(item.id)}
                                                            icon='PlayArrow'
                                                            aria-label='Start Test'
                                                        />)}


                                                </div>
                                            </td>
                                            <td>{item.paperTitle}</td>
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
                                                        {dayjs(`${item.expiryDT}`).format(
                                                            'MMM DD YYYY h:mm a',
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>{item.time}</td>
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

export default PaperList;
