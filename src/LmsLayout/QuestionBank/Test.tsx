import { useNavigate, useParams } from 'react-router-dom';
import Card, { CardActions, CardBody, CardFooter, CardHeader, CardLabel, CardSubTitle, CardTitle, } from '../../components/bootstrap/Card';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import './style.css';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import SubHeader, { SubHeaderLeft, SubheaderSeparator, SubHeaderRight } from '../../layout/SubHeader/SubHeader';
import Icon from '../../components/icon/Icon';
import { useContext, useEffect, useState } from 'react';
import { saveResultDetail, getQuestionToSolve, IQuestionProp, IResultProp, addRemoveFavourites } from '../../services/QBankService';
import AuthContext from '../../contexts/authContext';
import { PaperMode } from '../../common/data/constants';


const Test = () => {
    const navigate = useNavigate();
    const { session } = useContext(AuthContext);
    const { resultID } = useParams();
    const [paperData, setpaperData] = useState<IResultProp>({} as IResultProp);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<IQuestionProp>({} as IQuestionProp);


    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuestionToSolve(parseInt(resultID || ""), session?.userId, session?.accessToken);
            data.details.map((detail, i) => {
                detail.questOptions.map((o, oi) => {
                    o.IsChecked = detail.answer?.trim() == o.optionText?.trim();
                })
            })
            setpaperData(data);
            setCurrentQuestion(data.details[0]);
        };
        fetchData();
    }, []);

    //#region  Handle Add to Favourite


    const handleFlagClick = () => {
        const newStatus = !currentQuestion.isPopular;
        addFavourites();
        setpaperData((prevValue) => {
            const updatedDetails = [...prevValue.details];
            const currentQuestion = updatedDetails[currentQuestionIndex];
            currentQuestion.isPopular = newStatus;
            setCurrentQuestion(currentQuestion);
            return { ...prevValue, details: updatedDetails };
        });
    };

    const addFavourites = async () => {
        const data = await addRemoveFavourites({
            id: currentQuestion.questionId,
            remove: currentQuestion.isPopular,
            type: 'Mcq',
        }, session?.accessToken);
    };

    //#endregion

    //#region Handle OPtion check and save result


    const handleOptionClick = (answer: string, isTrue: boolean) => {
        setpaperData((prevValue) => {
            if ((!prevValue.details[currentQuestionIndex].isSolved || paperData.mode === PaperMode.Exam)) {
                const updatedDetails = [...prevValue.details];
                const currentQuestion = updatedDetails[currentQuestionIndex];
                currentQuestion.isSolved = true;
                currentQuestion.questOptions.forEach((option) => {
                    option.IsChecked = answer.trim() === option.optionText?.trim();
                });

                setCurrentQuestion(currentQuestion);
                saveResult(answer.trim(), isTrue);
                return { ...prevValue, details: updatedDetails };
            }
            return prevValue;
        });
    };

    const saveResult = async (answer: string, isTrue: boolean) => {
        const data = await saveResultDetail({ answer: answer, isTrue: isTrue, questionID: currentQuestion.questionId, resultID: parseInt(resultID || "") }, session?.accessToken);
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
                                                        <td>{detail.isPopular && <Icon icon='Flag' color='primary' />}</td>
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
                                            <button className={`p-2 ${currentQuestion.isPopular ? 'bg-danger' : 'bg-light'}`}
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
            </PageWrapper>
        </>
    );
};

export default Test;
