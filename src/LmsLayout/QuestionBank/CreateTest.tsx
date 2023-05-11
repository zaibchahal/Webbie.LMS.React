
import { useNavigate } from 'react-router-dom';
import Button from '../../components/bootstrap/Button';
import Card, { CardActions, CardBody, CardFooter, CardHeader, CardLabel, CardSubTitle, CardTitle, } from '../../components/bootstrap/Card';
import Page from "../../layout/Page/Page";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { LmsFeatures } from "../../menu";
import CommonDesc from '../../common/other/CommonDesc';
import Checks, { ChecksGroup } from '../../components/bootstrap/forms/Checks';

const CreateTest = () => {

    const navigate = useNavigate();

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
                        <CardBody className='p-5'>
                            <div className="form-check form-check-inline fs-4">
                                <label className="form-check-label">
                                    <input className="form-check-input border-black" checked type="radio" name="TestMode" value="Tutor" />
                                        Tutor
                                </label>
                            </div>
                            <div className="form-check form-check-inline fs-4">
                                <label className="form-check-label">
                                    <input className="form-check-input border-black" type="radio" name="TestMode" value="Exam" />
                                        Exam
                                </label>
                            </div>
                        </CardBody>
                    </Card>
                </Page>
            </PageWrapper>
        </>
    );
};

export default CreateTest;
