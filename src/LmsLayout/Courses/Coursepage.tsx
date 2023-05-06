import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import { useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import Img from '../assets/img/wanna/susy/susy9.png';
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import useDarkMode from '../../hooks/useDarkMode';
import showNotification from '../../components/extras/showNotification';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { LmsFeatures } from '../../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import Button from '../../components/bootstrap/Button';
import Page from '../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import { useVideo } from 'react-use';
import Icon from '../../components/icon/Icon';
import './Video.css';
import Badge from '../../components/bootstrap/Badge';
import Lectures from './Lectures';

const CoursePage = () => {
	// const [video, state, controls, ref] = useVideo(
	// 	<video src='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' autoPlay />,
	// );
	var src = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';

	// const [video, state, controls] = useVideo({ src });

	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(1);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);

	function togglePlay() {
		const video = videoRef.current;
		if (isPlaying) {
			video?.pause();
		} else {
			video?.play();
		}
		setIsPlaying(!isPlaying);
	}

	function toggleMute() {
		const video = videoRef.current;
		if (video) {
			video.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	}

	function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
		const video = videoRef.current;
		if (video) {
			setVolume(Number(e.target.value));
			video.volume = Number(e.target.value);
		}
	}

	function handleTimeUpdate() {
		const video = videoRef.current;
		if (video) {
			setCurrentTime(video.currentTime);
		}
	}

	function handleDurationChange() {
		const video = videoRef.current;
		if (video) {
			setDuration(video.duration);
		}
	}

	function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
		const video = videoRef.current;
		if (video) {
			video.currentTime = Number(e.target.value);
			setCurrentTime(video.currentTime);
		}
	}
	const toggleFullscreen = () => {
		const video = videoRef.current;
		if (video) {
			if (!document.fullscreenElement) {
				video.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}
	};
	const { darkModeStatus } = useDarkMode();
	return (
		<PageWrapper title={LmsFeatures.mycourses.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'My Courses', to: '/my-courses' },
							{ title: 'Course Preview', to: '/my-courses' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row h-100 align-content-start'>
					<div className='col-md-8'>
						{/* Profile Picture */}
						<Card>
							<CardHeader>
								<CardLabel icon='Person' iconColor='success'>
									<CardTitle>Course Overview</CardTitle>
									<CardSubTitle>
										<Breadcrumb
											list={[
												{ title: 'My Courses', to: '/my-courses' },
												{ title: 'Course Preview', to: '/my-courses' },
											]}
										/>
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<CardBody>
									<video
										ref={videoRef}
										src={src}
										onTimeUpdate={handleTimeUpdate}
										onLoadedMetadata={handleDurationChange}
										className='video-container'
									/>
									<div className='d-flex justify-content-center align-items-center'>
										{isPlaying ? (
											<Icon
												onClick={togglePlay}
												size='2x'
												icon='Pause'
												color='info'
											/>
										) : (
											<Icon
												onClick={togglePlay}
												icon='PlayArrow'
												size='2x'
												color='info'
											/>
										)}
										<span className='text-bold'>|</span>
										{isMuted ? (
											<Icon
												icon='VolumeOff'
												size='2x'
												color='info'
												onClick={toggleMute}
											/>
										) : (
											<Icon
												icon='VolumeDown'
												size='2x'
												color='info'
												onClick={toggleMute}
											/>
										)}

										<input
											type='range'
											min='0'
											max='1'
											step='0.01'
											value={volume}
											onChange={handleVolumeChange}
											className='mx-4'
										/>
										<div>{currentTime.toFixed(2)}</div>
										<input
											type='range'
											min='0'
											max={duration}
											step='0.01'
											value={currentTime}
											onChange={handleSeek}
											className='mx-2'
										/>
										<div>{duration.toFixed(2)}</div>

										<Icon
											className='fullscreen-button'
											onClick={toggleFullscreen}
											icon='Fullscreen'
											size='2x'
											color='info'
										/>
									</div>
									<div className='mt-3 mx-4'>
										<CardTitle className='text-bold h3'>
											SPECIAL CIRCULATIONS AND INTEGRATIVE SYSTEM
										</CardTitle>
										<CardSubTitle className='mt-4 h5 text-muted'>
											<span>Dr Hafiz Atif </span>
											<span>|</span>
											<span className='text-info'> 37 min</span>
										</CardSubTitle>
									</div>
								</CardBody>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-4'>
						<Card>
							<CardHeader className='mb-0 pb-0'>
								<CardLabel icon='ImportContacts' iconColor='success'>
									<CardTitle>Course Content</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<>
									<div className='text-bold mt-0 pt-0'>
										<div className='row g-2 mb-3 mt-0 pt-0'>
											<div className='col-auto mt-0 pt-0'>
												<Badge
													color={darkModeStatus ? 'light' : 'dark'}
													isLight>
													<Icon
														style={{
															fontSize: 'calc(1vh + 1vw)',
														}}
														icon='SlowMotionVideo'
													/>
													Lecture(65)
												</Badge>
											</div>
											<div className='col-auto mt-0 pt-0'>
												<Badge
													color={darkModeStatus ? 'light' : 'dark'}
													isLight>
													<Icon
														style={{
															fontSize: 'calc(1vh + 1vw)',
														}}
														className='fw-bold'
														icon='AlarmOn'
													/>
													56 Hrs, 34 Mins
												</Badge>
											</div>
										</div>
									</div>
									<div className='h4 mt-0 pt-0'>
										<div className='row g-2 mb-3 mt-0 pt-0'>
											<div className='col-auto mt-0 pt-0'>
												<Badge
													color={darkModeStatus ? 'light' : 'dark'}
													isLight>
													<Icon
														style={{
															fontSize: 'calc(1vh + 1vw)',
														}}
														className='fw-bold'
														icon='AlarmOn'
													/>
													Expires On (21/02/2024)
												</Badge>
											</div>
										</div>
									</div>
									<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom'></div>

									<Lectures
										mainHead='Cardiovascular System'
										totallectures={38}
										totaltime='56 Hrs, 34 Mins'
									/>
									<Lectures
										mainHead=' VASCULAR FUNCTION CURVE'
										totallectures={57}
										totaltime='32 Hrs, 4 Mins'
									/>
									<Lectures
										mainHead='RAAS'
										totallectures={7}
										totaltime='6 Hrs, 23 Mins'
									/>
									<Lectures
										mainHead='CARDIAC EQUATIONS AND ACTION POTENTIAL'
										totallectures={23}
										totaltime='12 Hrs, 45 Mins'
									/>

									{/* <Lectures /> */}
								</>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default CoursePage;
