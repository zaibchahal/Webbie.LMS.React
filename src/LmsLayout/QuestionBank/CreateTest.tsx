import { useNavigate } from 'react-router-dom';
import Card, { CardActions, CardBody, CardFooter, CardHeader, CardLabel, CardSubTitle, CardTitle, } from '../../components/bootstrap/Card';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { LmsFeatures } from '../../menu';
import { ISystemProp, IQuestionModeProp, getQuestionCount, getSystemQuestionCount, createTestResult, ICreateTestProp } from '../../services/QBankService';
import './style.css';
import React, { useEffect, useState } from 'react';
import { PaperMode } from '../../common/data/constants';
const CreateTest = () => {
    const navigate = useNavigate();

    const [questionModes, setQuestionModes] = useState<IQuestionModeProp[]>([]);
    const [systems, setSystems] = useState<ISystemProp[]>([]);
    const [testMode, settestMode] = useState('Tutor');
    const [questionMode, setQuestionMode] = useState('Unused');
    const [maxQPerBlock, setmaxQPerBlock] = useState<number>(0);
    const [QPerBlock, setQPerBlock] = useState<number>(0);



    useEffect(() => {
        const fetchData = async () => {
            const questmodedata = await getQuestionCount();
            const SystemQuestionCount = await getSystemQuestionCount();
            setQuestionModes(questmodedata);
            setSystems(SystemQuestionCount);
        };
        fetchData();
    }, []);

    const handleTestModeChange = (e: any) => {
        const selectedTestMode = e.target.value;
        settestMode(selectedTestMode);
    };

    const handleQuestionModeChange = (e: any) => {
        const selectedQuestionMode = e.target.value;

        setSystems((prevSystems) =>
            prevSystems.map((system) => {
                if (system.isChecked) {
                    const count = system.qCount.find((item) => item.qType === selectedQuestionMode)?.noOfQ || 0;
                    return { ...system, isChecked: count > 0 };
                }
                return system;
            })
        );
        setQuestionMode(selectedQuestionMode);
        updatemaxQPerBlock();
    };

    const handleSystemChange = (e: any) => {
        const systemId = parseInt(e.target.value);
        const isChecked = e.target.checked;

        setSystems((prevSystems) =>
            prevSystems.map((system) =>
                system.id === systemId ? { ...system, isChecked: isChecked } : system
            )
        );
        updatemaxQPerBlock();
    };

    const handleAllSystemChange = (e: any) => {
        const isChecked = e.target.checked;

        setSystems((prevSystems) =>
            prevSystems.map((system) => {
                const count = system.qCount.find((item) => item.qType === questionMode)?.noOfQ || 0;
                return { ...system, isChecked: isChecked && count > 0 };
            })
        );
        updatemaxQPerBlock();
    };

    const updatemaxQPerBlock = () => {

        setSystems((updatedSystems) => {
            let sum = 0;
            for (const system of updatedSystems) {
                if (system.isChecked) {
                    const count = system.qCount.find((item) => item.qType === questionMode)?.noOfQ || 0;
                    sum += count;
                }
            }
            sum = sum > 40 ? 40 : sum;
            if (sum < QPerBlock) {
                setQPerBlock(sum);
            }
            setmaxQPerBlock(sum > 40 ? 40 : sum);
            return updatedSystems;
        });
    };

    const handleBlockCountChange = (e: any) => {
        const count = e.target.value;
        if (count > maxQPerBlock || count < 0) {
            e.target.value = maxQPerBlock;
        } else {
            setQPerBlock(() => count);
        }
    };

    const handleGenerateTest = (e: any) => {
        const postData = async () => {
            const resultID = await createTestResult(
                {
                    maxQPerBlock: QPerBlock,
                    mode: testMode,
                    questionMode: questionMode,
                    systems: systems.map((system) => system.id).join(',')
                } as ICreateTestProp);

            navigate("/mcq-bank/test/" + resultID);
        };
        postData();


    }

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
                                        value={PaperMode.Tutor}
                                        onChange={handleTestModeChange}
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
                                        value={PaperMode.Exam}
                                        onChange={handleTestModeChange}
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
                            {questionModes.map((qm) => (
                                <div className='form-check form-check-inline fs-4 mr-4' key={qm.qType}>
                                    <label className='form-check-label'>
                                        <input
                                            className='form-check-input border-black'
                                            type='radio'
                                            name='QuestionMode'
                                            value={qm.qType}
                                            defaultChecked={qm.qType === 'Unused'}
                                            onChange={handleQuestionModeChange}
                                        />
                                        {qm.qType}
                                        <span className='badge  badge-sm'>{qm.noOfQ}</span>
                                    </label>
                                </div>
                            ))}
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader borderSize={1}>
                            <CardLabel>
                                <CardTitle>
                                    <label className='form-check-label fs-4'> <input
                                        className='form-check-input border-black'
                                        type='checkbox'
                                        name='AllSystems'
                                        onChange={handleAllSystemChange}
                                    /> &nbsp; Systems</label>
                                </CardTitle>
                                <CardSubTitle>Select systems</CardSubTitle>
                            </CardLabel>
                        </CardHeader>
                        <CardBody className='p-4'>
                            <div className='row'>
                                {systems.map((system) => (
                                    <div className='col-md-6 mb-4' key={system.id}>
                                        <div className='form-check form-check-inline fs-4'>
                                            <label className='form-check-label' key={system.id}>
                                                <input
                                                    className='form-check-input border-black'
                                                    type='checkbox'
                                                    name='Systems'
                                                    onChange={handleSystemChange}
                                                    value={system.id}
                                                    checked={system.isChecked || false}
                                                    disabled={system.qCount.find((item) => item.qType === questionMode)?.noOfQ === 0}
                                                />
                                                {system.name}
                                                <span className='badge badge-sm'>{system.qCount.find((item) => item.qType === questionMode)?.noOfQ}</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
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
                                    style={{ width: '120px' }}
                                    type='number'
                                    placeholder='0'
                                    value={QPerBlock}
                                    onChange={handleBlockCountChange}
                                />
                                <label className='mt-2 '>
                                    &emsp;&emsp; Max allowed per block
                                    <span className='badge  badge-sm'>{maxQPerBlock}</span>
                                </label>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className='p-4'>
                            <button className='btn btn-large btn-primary' onClick={handleGenerateTest} disabled={QPerBlock == 0}>
                                Generate Test
                            </button>
                        </CardBody>
                    </Card>
                </Page>
            </PageWrapper>
        </>
    );
};

export default CreateTest;
