import React, { FC, useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import Pass from '../../assets/img/lms/pass.png';
import Fail from '../../assets/img/lms/fail.png';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle, } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import { IQuestionPapersProp, getQuestionPapers, createTestResultByPaper, getQuestionToSolve, IResultProp } from '../../services/QBankService';
import AuthContext from '../../contexts/authContext';
import { LmsFeatures } from '../../menu';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { useNavigate, useParams } from 'react-router-dom';
import Chart, { IChartOptions } from '../../components/extras/Chart';
import { ApexOptions } from 'apexcharts';

const QbankAnalysis = () => {
    const { themeStatus, darkModeStatus } = useDarkMode();
    const { resultID } = useParams();
    const { session } = useContext(AuthContext);
    const [paperData, setpaperData] = useState<IResultProp>({} as IResultProp);
    const [correct, setcorrect] = useState(0);
    const [incorrect, setincorrect] = useState(0);
    const [ommited, setommited] = useState(0);
    const [solved, setsolved] = useState(0);
    const [total, settotal] = useState(0);
    const [per, setPer] = useState(0);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuestionToSolve(parseInt(resultID || ""), session?.userId, session?.accessToken);
            setpaperData(data);

            const incorrectcount = data.details.filter(question => !question.isTrue).length;
            const correctCount = data.details.filter(question => question.isTrue).length;
            const totalCount = data.details.length;
            const percentage = Math.round((correctCount / totalCount) * 100);

            setommited(data.details.filter(question => !question.isSolved).length);
            setsolved(data.details.filter(question => question.isSolved).length);
            setincorrect(incorrectcount);
            setcorrect(correctCount);
            settotal(totalCount);

            setPer(percentage);

            setState({
                series: [incorrectcount, correctCount],
                options: chartOptions,
            });
        };
        fetchData();
    }, []);


    const chartOptions: ApexOptions = {
        chart: {
            type: 'donut',
            height: 350,
        },
        stroke: {
            width: 0,
        },
        labels: ['In-Correct', 'Correct'],
        dataLabels: {
            enabled: false,
        },
        colors: ['#ff8080', '#80ff80'],
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '24px',
                            fontFamily: 'Poppins',
                            fontWeight: 900,
                            offsetY: 0,
                            formatter(val) {
                                return val;
                            },
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Poppins',
                            fontWeight: 900,
                            offsetY: 16,
                            formatter(val) {
                                return val;
                            },
                        },
                    },
                },
            },
        },
        legend: {
            show: true,
            position: 'bottom',
        },
    };


    const [state, setState] = useState<IChartOptions>({
        series: [incorrect, correct],
        options: chartOptions,
    });


    return (
        <>
            <PageWrapper title={LmsFeatures.mcqbank.text}>
                <Page>
                    <Card >
                        <CardHeader borderSize={1}>
                            <CardLabel icon='BookmarkAdd' iconColor='info'>
                                <CardTitle>Analysis </CardTitle>
                            </CardLabel>
                            <CardActions>
                                <Button
                                    color='info'
                                    icon='Plus'
                                    isLight
                                    onClick={() => navigate("/mcq-bank/answers/" + resultID)}
                                >
                                    Show Answers
                                </Button>
                                <Button
                                    color='info'
                                    icon='Plus'
                                    isLight
                                    onClick={() => navigate(`../${LmsFeatures.mcqbank.subMenu.previousattempts.path}`)}
                                >
                                    Back To List
                                </Button>
                            </CardActions>
                        </CardHeader>
                        <CardBody className='h-100 table-responsive'>
                            <div className="row">

                                <div className='row'>
                                    <div className='col-3'>
                                        <div className='ratio ratio-21x9'>
                                            <div
                                                className={classNames(
                                                    'rounded-2',
                                                    'd-flex align-items-center justify-content-center',
                                                    {
                                                        'bg-l10-primary': !darkModeStatus,
                                                        'bg-lo25-primary': darkModeStatus,
                                                    },
                                                )}>
                                                <div>
                                                    <span className='text-primary fs-5 fw-bold align-text-bottom'>
                                                        QUESTIONS COMPLETED
                                                    </span>
                                                    <br />
                                                    <span className='text-primary fs-3 fw-bold'>
                                                        {solved}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-3'>
                                        <div className='ratio ratio-21x9'>
                                            <div
                                                className={classNames(
                                                    'rounded-2',
                                                    'd-flex align-items-center justify-content-center',
                                                    {
                                                        'bg-l10-info': !darkModeStatus,
                                                        'bg-lo25-info': darkModeStatus,
                                                    },
                                                )}>
                                                <div>
                                                    <span className='text-info fs-5 fw-bold align-text-bottom'>
                                                        OMITTED QUESTIONS
                                                    </span>
                                                    <br />
                                                    <span className='text-info fs-3 fw-bold'>
                                                        {ommited}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-3'>
                                        <div className='ratio ratio-21x9'>
                                            <div
                                                className={classNames(
                                                    'rounded-2',
                                                    'd-flex align-items-center justify-content-center',
                                                    {
                                                        'bg-l10-success': !darkModeStatus,
                                                        'bg-lo25-success': darkModeStatus,
                                                    },
                                                )}>
                                                <div>
                                                    <span className='text-success fs-5 fw-bold align-text-bottom'>
                                                        CORRECT ANSWERS
                                                    </span>
                                                    <br />
                                                    <span className='text-success fs-3 fw-bold'>
                                                        {correct}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-3'>
                                        <div className='ratio ratio-21x9'>
                                            <div
                                                className={classNames(
                                                    'rounded-2',
                                                    'd-flex align-items-center justify-content-center',
                                                    {
                                                        'bg-l10-danger': !darkModeStatus,
                                                        'bg-lo25-danger': darkModeStatus,
                                                    },
                                                )}>
                                                <div>
                                                    <span className='text-danger fs-5 fw-bold align-text-bottom'>
                                                        WRONG ANSWERS
                                                    </span>
                                                    <br />
                                                    <span className='text-danger fs-3 fw-bold'>
                                                        {incorrect}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='col-4'>
                                    <Card stretch>
                                        <CardBody>
                                            <Chart
                                                series={state.series}
                                                options={state.options}
                                                type={state.options.chart?.type}
                                                height={state.options.chart?.height}
                                            />
                                        </CardBody>
                                    </Card>
                                </div>

                                <div className='col-4'>
                                    <Card stretch>
                                        <CardBody>
                                            <p>You completed {solved} /{total} questions. You answered: </p>
                                            <p><Icon icon='Circle' color='success' /> {per} % correctly (1 questions)</p>
                                            <p> <Icon icon='Circle' color='danger' /> {100 - per} % incorrectly  (1 questions)</p>
                                            <div>
                                                <img className='img-fluid' src={per >= 50 ? Pass : Fail} ></img>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Page>
            </PageWrapper>
        </>
    );
};

export default QbankAnalysis;
