import React, { useContext, useEffect, useState } from 'react';
import Card, {
    CardHeader,
    CardLabel,
    CardTitle,
    CardSubTitle,
    CardBody,
} from '../../components/bootstrap/Card';
import Icon from '../../components/icon/Icon';
import Badge from '../../components/bootstrap/Badge';
import useDarkMode from '../../hooks/useDarkMode';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import { GetVideoDetails, ILecture, postIsWatched } from '../../services/Courses.server';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { UpdateVideoDetails, UpdateVideoSrc } from '../../@features/MyCourses/Courses.slice';
import AuthContext from '../../contexts/authContext';

const Lectures = (props: {
    mainHead: string;
    totallectures: number;
    totaltime: number;
    lectures: ILecture[];
}) => {
    const mainHead = props.mainHead;
    const totallectures = props.totallectures;
    const totaltime = props.totaltime;
    const lectures = props.lectures;
    const { session } = useContext(AuthContext);
    const { darkModeStatus } = useDarkMode();
    const [show, setShow] = useState(false);
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        GetVideoDetails(
            lectures[0].id,
            lectures[0].sectionID,
            lectures[0].courseID,
            session?.accessToken,
        ).then((res) => {
            console.log(res);
            dispatch(UpdateVideoDetails(res));
        });
    }, [dispatch, session?.accessToken, session?.userId, lectures]);

    let myCourseStore = useSelector((store: RootState) => store.myCourses);

    const handleVideoPlay = (l: ILecture) => {
        // dispatch(UpdateVideoSrc(l.path));
        GetVideoDetails(l.id, l.sectionID, l.courseID, session?.accessToken).then((res) => {
            console.log(res);
            dispatch(UpdateVideoDetails(res));
            postIsWatched(l.id, session?.accessToken).then((res2) => {
                console.log(res2);
            });
        });
    };

    // const handleIsWatched=()=>{
    // 	postIsWatched(session?.accessToken).then((res) => {
    // 		console.log(res);
    // 		dispatch(UpdateVideoDetails(res));
    // 	});
    // }

    return (
        <div>
            <div className='mt-3'>
                <div className='d-flex justify-content-between align-items-start'>
                    <div>
                        <CardTitle>{mainHead}</CardTitle>
                        <div>
                            <div className='row g-2 mb-3'>
                                <div className='col-auto'>
                                    <Badge color={darkModeStatus ? 'light' : 'dark'} isLight>
                                        <Icon
                                            style={{
                                                fontSize: 'calc(1vh + 1vw)',
                                            }}
                                            icon='SlowMotionVideo'
                                        />
                                        Lecture({totallectures})
                                    </Badge>
                                </div>
                                <div className='col-auto'>
                                    <Badge color={darkModeStatus ? 'light' : 'dark'} isLight>
                                        <Icon
                                            style={{
                                                fontSize: 'calc(1vh + 1vw)',
                                            }}
                                            className='fw-bold'
                                            icon='AlarmOn'
                                        />
                                        {Math.floor(totaltime / 60)} Hrs , {totaltime % 60} Mins
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Icon
                        style={{
                            fontSize: 'calc(3vh + 1vw)',
                        }}
                        className='fw-bold'
                        icon={show ? 'ArrowDropUp' : 'ArrowDropDown'}
                        onClick={() => setShow(!show)}
                    />
                </div>
                <div>
                    {show && (
                        <>
                            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom'></div>

                            {lectures.map((l, k) => (
                                <div className='d-flex justify-content-start align-items-center' key={l.id}>
                                    <FormGroup id='eventAllDay'>
                                        <input
                                            type='checkbox'
                                            name=''
                                            checked={l.isWatched}
                                            id=''
                                        />
                                    </FormGroup>
                                    <div
                                        onClick={() => handleVideoPlay(l)}
                                        className='mt-4 text-decoration-none mx-2'>
                                        <div className='col-auto text-decoration-none text-bolder'>
                                            <Icon
                                                style={{
                                                    fontSize: 'calc(1vh + 1vw)',
                                                }}
                                                icon='SlowMotionVideo'
                                            />
                                            {l.title}
                                        </div>
                                        <div className='col-auto text-muted mt-1'>
                                            <Icon
                                                style={{
                                                    fontSize: 'calc(1vh + 1vw)',
                                                }}
                                                className='fw-bold'
                                                icon='AlarmOn'
                                            />
                                            {Math.floor(l.length / 60) !== 0 &&
                                                Math.floor(l.length / 60) + 'Hrs ,'}
                                            {l.length % 60} Mins
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom'></div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Lectures;
