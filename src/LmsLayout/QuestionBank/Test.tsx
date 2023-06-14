import { useNavigate, useParams } from 'react-router-dom';
import Card, { CardActions, CardBody, CardFooter, CardHeader, CardLabel, CardSubTitle, CardTitle, } from '../../components/bootstrap/Card';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import './style.css';
import SubHeader, { SubHeaderLeft, SubheaderSeparator, SubHeaderRight } from '../../layout/SubHeader/SubHeader';
import Icon from '../../components/icon/Icon';
import React, { useCallback, useEffect, useState } from 'react';
import { saveResultDetail, getQuestionToSolve, IQuestionProp, IResultProp, addRemoveFavourites, completed } from '../../services/QBankService';
import { PaperMode } from '../../common/data/constants';


const Test = () => {
    const navigate = useNavigate();
    const { resultID } = useParams();
    const [paperData, setpaperData] = useState<IResultProp>({} as IResultProp);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<IQuestionProp>({} as IQuestionProp);
    const [timer, settimer] = useState("");
    const [allowEnd, setallowEnd] = useState(false);

    const CompleteResult = useCallback(async (type: string) => {
        const data = await completed(parseInt(resultID || ""));
        navigate("/mcq-bank/analysis/" + resultID);
    }, [navigate, resultID]);

    useEffect(() => {
        const fetchData = async () => {

            //#region Timer
            function startTimer(pData: IResultProp) {
                const dt = new Date().getTime();
                const minutes = pData.timeGiven ?? 40;
                const countDownDate = new Date(dt + minutes * 60000).getTime();

                const interval = setInterval(function () {
                    var dtt = new Date().getTime();
                    const now = new Date(dtt - pData.timeElapsed * 60000).getTime();
                    var distance;

                    if (pData.mode === PaperMode.Tutor) {
                        distance = now - dt;
                    } else {
                        distance = countDownDate - now;
                    }

                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    settimer(display(hours) + ":" + display(remainingMinutes) + ":" + display(seconds));
                    if (distance < 0) {
                        clearInterval(interval);
                        setallowEnd(true);
                        settimer("00:00:00");
                        CompleteResult("TimeUp");
                    }
                }, 1000);
            }

            function display(time: number) {
                return time < 10 ? "0" + time : time.toString();
            }

            //#endregion

            const data = await getQuestionToSolve(parseInt(resultID || ""));
            data.details.map((detail, i) => {
                detail.questOptions.map((o, oi) => {
                    o.IsChecked = detail.answer?.trim() == o.optionText?.trim();
                })
            })
            setpaperData(data);
            setCurrentQuestion(data.details[0]);
            startTimer(data);

            //const handleUnload = (event: BeforeUnloadEvent) => {
            //    if (!allowEnd) {
            //        event.preventDefault();
            //        event.returnValue = false;
            //    }
            //};

            //window.addEventListener('beforeunload', handleUnload);

            //return () => {
            //    window.removeEventListener('beforeunload', handleUnload);
            //};

        };
        fetchData();
    }, [resultID, CompleteResult]);

    //#region  Handle Add to Favourite


    const handleFlagClick = () => {
        const newStatus = !currentQuestion.isPopular;
        addFavourites();
        setpaperData((prevValue) => {
            const updatedDetails = [...prevValue.details];
            const cQuestion = updatedDetails[currentQuestionIndex];
            cQuestion.isPopular = newStatus;
            setCurrentQuestion(cQuestion);
            return { ...prevValue, details: updatedDetails };
        });
    };

    const addFavourites = async () => {
        const data = await addRemoveFavourites({
            id: currentQuestion.questionId,
            remove: currentQuestion.isPopular,
            type: 'Mcq',
        });
    };

    //#endregion

    //#region Handle OPtion check and save result


    const handleOptionClick = (answer: string, isTrue: boolean) => {
        setpaperData((prevValue) => {
            if ((!prevValue.details[currentQuestionIndex].isSolved || paperData.mode === PaperMode.Exam)) {
                const updatedDetails = [...prevValue.details];
                const cQuestion = updatedDetails[currentQuestionIndex];
                cQuestion.isSolved = true;
                cQuestion.questOptions.forEach((option) => {
                    option.IsChecked = answer.trim() === option.optionText?.trim();
                });

                setCurrentQuestion(cQuestion);
                saveResult(answer.trim(), isTrue);
                return { ...prevValue, details: updatedDetails };
            }
            return prevValue;
        });
    };

    const saveResult = async (answer: string, isTrue: boolean) => {
        const data = await saveResultDetail({ answer: answer, isTrue: isTrue, questionID: currentQuestion.questionId, resultID: parseInt(resultID || "") });
    };


    //#endregion

    //#region Move next Prev or GotoQuestion

    const handleNextQuestion = () => {
        if (currentQuestionIndex < paperData.details.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentQuestion(paperData.details[currentQuestionIndex + 1])
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setCurrentQuestion(paperData.details[currentQuestionIndex - 1])
        }
    };
    const handlegotoQuestion = (qNo: number) => {
        goToQuestion(qNo);
    };

    const goToQuestion = (questionIndex: number) => {
        if (questionIndex >= 0 && questionIndex < paperData.details.length) {
            setCurrentQuestionIndex(questionIndex);
            setCurrentQuestion(paperData.details[questionIndex])
        }
    };

    //#endregion


    return (
        <>
            <PageWrapper title='Test'>
                <Page>
                    <SubHeader>
                        <SubHeaderLeft>
                            {paperData.mode == PaperMode.Tutor ? (
                                <span style={{ fontSize: 16 }} className="badge badge-lg bg-primary">Tutor Mode</span>
                            ) : (<span style={{ fontSize: 16 }} className="badge badge-lg bg-dark">Exam Mode</span>)

                            }
                            <SubheaderSeparator />
                            <h5>Time {paperData.mode == PaperMode.Exam ? 'Remaining' : ''} : <span>{timer} min </span> <br /></h5>
                        </SubHeaderLeft>
                        <SubHeaderRight>
                            <button onClick={() => CompleteResult('End')} className="btn btn-danger"> End </button>
                        </SubHeaderRight>
                    </SubHeader>
                    <Card>
                        <CardHeader borderSize={1}>
                            <CardLabel icon='LocalPolice' iconColor='primary'>
                                <CardTitle> {paperData.questionPaper ? paperData.questionPaper : "Question Paper"}</CardTitle>
                                {/* <CardSubTitle>Select a test mode</CardSubTitle> */}
                            </CardLabel>
                        </CardHeader>
                        <CardBody className='py-4'>
                            <div className='row'>
                                <div className='col-2 col-lg-1 col-md-2 col-sm-2'>
                                    <div className='' style={{ height: '70vh', overflowY: 'scroll' }}>
                                        <table className="table table-hover text-center">
                                            <tbody>
                                                {paperData.details?.map((detail, i) => (
                                                    <tr
                                                        key={i + 1}
                                                        className={`border-t-b ${i === currentQuestionIndex ? 'bg-info-subtle' : ''}`}
                                                        onClick={() => handlegotoQuestion(i)}
                                                    >
                                                        <td>{!detail.isSolved && <Icon icon='Circle' color='primary' />}</td>
                                                        <td className="py-2">{i + 1}</td>
                                                        <td>{detail?.isPopular && <Icon icon='Flag' color='primary' />}</td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className='col-10 col-lg-11 col-md-10 col-sm-10'>
                                    <SubHeader>
                                        <SubHeaderLeft>
                                            <Icon icon='DateRange' size='2x' color='primary' />
                                            <SubheaderSeparator />
                                            <span>{currentQuestionIndex + 1}</span>
                                            <span>-</span>
                                            <span>{paperData.details?.length}</span>
                                        </SubHeaderLeft>
                                        <SubHeaderRight>
                                            <button className='bg-light p-2'
                                                onClick={handlePreviousQuestion}>
                                                <Icon icon='FastRewind' size='2x' color='primary' />
                                            </button>
                                            <button className='bg-light p-2'
                                                onClick={handleNextQuestion}>
                                                <Icon icon='FastForward' size='2x' color='primary' />
                                            </button>
                                            <button className={`p-2 ${currentQuestion?.isPopular ? 'bg-danger' : 'bg-light'}`}
                                                onClick={handleFlagClick}>
                                                <Icon icon='Flag' size='2x' color='primary' />
                                            </button>
                                            <button className='bg-light p-2'>
                                                <Icon icon='Fullscreen' size='2x' color='primary' />
                                            </button>
                                        </SubHeaderRight>
                                    </SubHeader>

                                    {paperData.details?.length > 0 && (
                                        <div className='card my-3'>
                                            <div className='card-body'>
                                                <h5 className='card-title'>
                                                    {currentQuestionIndex + 1} : {currentQuestion.question || ''}
                                                </h5>
                                                {currentQuestion.questOptions?.map(
                                                    (option, index) => (

                                                        <div
                                                            key={index}
                                                            className={`card my-2 ${paperData.mode == PaperMode.Tutor && currentQuestion.isSolved ? (option.isCorrect ? 'bg-l25-success' : option.IsChecked ? 'bg-l25-danger' : '') : ''}`}
                                                            onClick={() => handleOptionClick(option.optionText, option.isCorrect)}
                                                            style={{ cursor: currentQuestion.isSolved ? 'default' : 'pointer' }}>
                                                            <div className='card-body'>
                                                                <div className='form-check'>
                                                                    <input
                                                                        className='form-check-input'
                                                                        type='radio'
                                                                        checked={option.IsChecked}
                                                                        onChange={() => { }}
                                                                    />
                                                                    <label className='form-check-label'>{option.optionText}</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            {paperData.mode == PaperMode.Tutor && currentQuestion.isSolved && (
                                                <>
                                                    <div className='card-footer'>
                                                        <p className='mb-0'>
                                                            <strong>Correct answer:</strong>{' '}
                                                            {currentQuestion.questOptions.filter(x => x.isCorrect == true)[0].optionText}
                                                        </p>
                                                    </div>
                                                    <div className='card-footer'>
                                                        <div className='mb-0'>
                                                            <h2>Explanation:</h2>{' '}
                                                            <div dangerouslySetInnerHTML={{ __html: currentQuestion.ansExplain }}></div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Page>
            </PageWrapper >
        </>
    );
};

export default Test;
