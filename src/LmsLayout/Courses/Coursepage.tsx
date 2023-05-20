import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import { useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import useDarkMode from '../../hooks/useDarkMode';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { LmsFeatures } from '../../menu';
import SubHeader, { SubHeaderLeft } from '../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import Page from '../../layout/Page/Page';
import Card, {
    CardBody,
    CardHeader,
    CardLabel,
    CardSubTitle,
    CardTabItem,
    CardTitle,
} from '../../components/bootstrap/Card';
import { useVideo } from 'react-use';
import Icon from '../../components/icon/Icon';
import './Video.css';
import Badge from '../../components/bootstrap/Badge';
import Lectures from './Lectures';
import Button from '../../components/bootstrap/Button';
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';
import InputGroup from '../../components/bootstrap/forms/InputGroup';
import Textarea from '../../components/bootstrap/forms/Textarea';
import ReviewScreen from '../LmsPages/RattingPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UpdateVideoDetails } from '../../@features/MyCourses/Courses.slice';
import { initialVideoDetails } from '../../services/Courses.server';

const CoursePage = () => {
    // const [video, state, controls, ref] = useVideo(
    // 	<video src='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' autoPlay />,
    // );
    var src = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';

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
    const [discussion, setDiscussion] = useState('');
    const [durationFormat, setDurationFormate] = useState('');
    // const [videoSrc, setVideoSrc] = useState(videoData.video.path);
    let myCourseStore = useSelector((store: RootState) => store.myCourses);

    const [videoData, setVideoData] = useState(initialVideoDetails);

    useEffect(() => {
        setVideoData(myCourseStore.videoDetails);
    }, [myCourseStore.videoDetails]);

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
                <div className='row align-content-start'>
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
                                    {/* <video
										ref={videoRef}
										src={myCourseStore.videoScr}
										onTimeUpdate={handleTimeUpdate}
										onLoadedMetadata={handleDurationChange}
										className='video-container'
									/> */}
                                    <iframe
                                        // ref={videoRef}
                                        src={videoData.video.path}
                                        width='560'
                                        height='315'
                                        frameBorder='0'
                                        allowFullScreen
                                    />
                                    {/* <div className='d-flex justify-content-center align-items-center'>
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
									</div> */}
                                    <div className='mt-3 mx-4'>
                                        <CardTitle className='text-bold h3'>
                                            {videoData.video.title}
                                        </CardTitle>
                                        <CardSubTitle className='mt-4 h5 text-muted'>
                                            <span>Dr Hafiz Atif </span>
                                            <span className='mx-1'> | </span>
                                            <span className='text-info'>
                                                {Math.floor(videoData.video.length / 60) !== 0 &&
                                                    Math.floor(videoData.video.length / 60) +
                                                    'Hrs ,'}
                                                {videoData.video.length % 60} Mins
                                            </span>
                                        </CardSubTitle>
                                    </div>
                                </CardBody>
                            </CardBody>
                        </Card>
                        <div className='row align-items-start'>
                            <Card hasTab>
                                <CardTabItem id='overview' title='Overflow' icon='Shop'>
                                    <div className='row d-flex justify-content-start mb-1'>
                                        <Button
                                            style={{ width: '140px', marginRight: '10px' }}
                                            color='primary'
                                            isLight
                                            icon='PublishedWithChanges'
                                        // onClick={() => setNumberVerification(true)}
                                        >
                                            LIKE
                                        </Button>
                                        <Button
                                            style={{ width: '140px' }}
                                            color='primary'
                                            isLight
                                            icon='PublishedWithChanges'
                                        // onClick={() => setNumberVerification(true)}
                                        >
                                            SHARE
                                        </Button>
                                        <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2  mb-3 border-bottom'></div>
                                    </div>
                                    <div className='row'>
                                        <CardTitle>Course Description</CardTitle>
                                        <CardSubTitle className='mt-2'>
                                            {videoData.video.description}
                                        </CardSubTitle>
                                    </div>

                                    <div className='row mt-4'>
                                        <CardTitle>Course Outcomes</CardTitle>
                                        <CardSubTitle className='mt-2'>
                                            <ul>
                                                <li>BRS PHYSIOLOGY</li>
                                            </ul>
                                        </CardSubTitle>
                                    </div>
                                </CardTabItem>
                                <CardTabItem id='faq' title='FAQ' icon='PictureAsPdf'>
                                    <>
                                        <div className='row d-flex justify-content-start mb-1'>
                                            <Button
                                                style={{ width: '140px', marginRight: '10px' }}
                                                color='primary'
                                                isLight
                                                icon='PublishedWithChanges'
                                            // onClick={() => setNumberVerification(true)}
                                            >
                                                LIKE
                                            </Button>
                                            <Button
                                                style={{ width: '140px' }}
                                                color='primary'
                                                isLight
                                                icon='PublishedWithChanges'
                                            // onClick={() => setNumberVerification(true)}
                                            >
                                                SHARE
                                            </Button>
                                            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2  mb-3 border-bottom'></div>
                                        </div>
                                    </>
                                </CardTabItem>
                                <CardTabItem id='discussion' title='Discussion' icon='LibraryMusic'>
                                    <>
                                        <div className='row d-flex justify-content-start mb-1'>
                                            <Button
                                                style={{ width: '140px', marginRight: '10px' }}
                                                color='primary'
                                                isLight
                                                icon='PublishedWithChanges'
                                            // onClick={() => setNumberVerification(true)}
                                            >
                                                LIKE
                                            </Button>
                                            <Button
                                                style={{ width: '140px' }}
                                                color='primary'
                                                isLight
                                                icon='PublishedWithChanges'
                                            // onClick={() => setNumberVerification(true)}
                                            >
                                                SHARE
                                            </Button>
                                            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2  mb-3 border-bottom'></div>
                                        </div>
                                        <InputGroup>
                                            <Textarea
                                                title='Message'
                                                placeholder='Write Your Message'
                                                value={discussion}
                                                onChange={(e: any) => {
                                                    setDiscussion(e.target.value);
                                                }}
                                            />
                                            <Button color='info' icon='Send'>
                                                SEND
                                            </Button>
                                        </InputGroup>
                                    </>
                                </CardTabItem>
                                <CardTabItem id='reviews' title='Reviews' icon='AutoStories'>
                                    <>
                                        <div className='row d-flex justify-content-start mb-1'>
                                            <Button
                                                style={{ width: '140px', marginRight: '10px' }}
                                                color='primary'
                                                isLight
                                                icon='PublishedWithChanges'
                                            // onClick={() => setNumberVerification(true)}
                                            >
                                                LIKE
                                            </Button>
                                            <Button
                                                style={{ width: '140px' }}
                                                color='primary'
                                                isLight
                                                icon='PublishedWithChanges'
                                            // onClick={() => setNumberVerification(true)}
                                            >
                                                SHARE
                                            </Button>
                                            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2  mb-3 border-bottom'></div>
                                        </div>
                                        <ReviewScreen />
                                    </>
                                </CardTabItem>
                            </Card>
                        </div>
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
                                                    Lecture({myCourseStore.myCourses.lessons})
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
                                                    {Math.floor(myCourseStore.myCourses.time / 60)}
                                                    Hrs, {myCourseStore.myCourses.time % 60} Mins
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
                                                    Expires On (
                                                    {myCourseStore.myCourses.endDate === null
                                                        ? 'Life Time'
                                                        : myCourseStore.myCourses.endDate}
                                                    )
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom'></div>
                                    {myCourseStore.Course.section.map((s, k) => (
                                        <Lectures key={s.id}
                                            mainHead={s.sectionTitle}
                                            totallectures={s.lessons}
                                            totaltime={s.duration}
                                            lectures={s.lecture}
                                        />
                                    ))}
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
