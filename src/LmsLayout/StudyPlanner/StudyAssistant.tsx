import React from 'react';
import Button from '../../components/bootstrap/Button';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { LmsFeatures, demoPagesMenu } from '../../menu';
import Humans from '../../assets/img/scene4.png';
import HumansWebp from '../../assets/img/scene4.webp';

const StudyAssistant = () => {
	return (
		<div>
			<PageWrapper title={LmsFeatures.studyassistant.text}>
				<Page>
					<div className='row h-100'>
							<div className='col-4 d-flex align-items-center justify-content-center mt-5'>
								<img
									srcSet={HumansWebp}
									src={Humans}
									alt='Humans'
									style={{ height: '55vh' }}
								/>
							</div>
							<div className='col-8 d-flex flex-column justify-content-center align-items-center'>
								<div
									className='text-primary fw-bold text-center'
									style={{ fontSize: 'calc(2rem + 2vw)' }}>
									Amazing New Feature Comming Soon
								</div>
								<div
									className='text-dark fw-bold'
									style={{ fontSize: 'calc(1.5rem + 1.5vw)' }}>
									Please stay Tuned
								</div>
							</div>
						</div>
				</Page>
			</PageWrapper>
		</div>
	);
};

export default StudyAssistant;
