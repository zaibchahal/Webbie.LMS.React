import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, STUDENT_URLS } from '../common/data/constants';

export const getMyCoursesList = async (
	userId: number | undefined,
	accessToken: string | undefined,
) => {
	try {
		const response = await axios.post(
			STUDENT_URLS.GetMyCoursesList,
			{
				filter: null,
				studentID: userId,
			},
			{
				headers: {
					Accept: 'text/plain',
					'Content-Type': 'application/json-patch+json',
					'X-XSRF-TOKEN': 'null',
					Authorization: `Bearer ${accessToken}`,
				},
				withCredentials: true,
			},
		);
		console.log('success myCourses');
		return response.data.result || [];
	} catch {
		return [];
	}
};

export const GetSearchContent = async (
	searchString: string | undefined,
	accessToken: string | undefined,
) => {
	try {
		const response = await axios.post(
			STUDENT_URLS.GetSearchContent,
			{
				text: searchString,
			},
			{
				headers: {
					Accept: 'text/plain',
					'Content-Type': 'application/json-patch+json',
					'X-XSRF-TOKEN': 'null',
					Authorization: `Bearer ${accessToken}`,
				},
				withCredentials: true,
			},
		);
		console.log('success search content');
		return response.data.result || [];
	} catch {
		return [];
	}
};

export const GetCourse = async (CourseId: number | undefined, accessToken: string | undefined) => {
	try {
		const response = await axios.get(STUDENT_URLS.GetCourse + '?ID=' + CourseId, {
			headers: {
				Accept: 'text/plain',
				'Content-Type': 'application/json-patch+json',
				'X-XSRF-TOKEN': 'null',
				Authorization: `Bearer ${accessToken}`,
			},
			withCredentials: true,
		});
		console.log('success Course Click');
		return response.data.result || [];
	} catch {
		return [];
	}
};

export const GetVideoDetails = async (
	VideoId: number | undefined,
	SecId: number | undefined,
	CourseId: number | undefined,
	accessToken: string | undefined,
) => {
	try {
		const response = await axios.get(
			STUDENT_URLS.GetVideoDetails +
				'?VideoID=' +
				VideoId +
				'&SecID=' +
				SecId +
				'&CourseID=' +
				CourseId,
			{
				headers: {
					Accept: 'text/plain',
					'Content-Type': 'application/json-patch+json',
					'X-XSRF-TOKEN': 'null',
					Authorization: `Bearer ${accessToken}`,
				},
				withCredentials: true,
			},
		);
		console.log('success Video Details');
		return response.data.result || [];
	} catch {
		return [];
	}
};

export const postIsWatched = async (
	VideId: number | undefined,
	accessToken: string | undefined,
) => {
	try {
		const response = await axios.post(
			STUDENT_URLS.postIsWatched,
			{
				videoID: VideId,
				isCompleted: true,
			},
			{
				headers: {
					Accept: 'text/plain',
					'Content-Type': 'application/json-patch+json',
					'X-XSRF-TOKEN': 'null',
					Authorization: `Bearer ${accessToken}`,
				},
				withCredentials: true,
			},
		);
		console.log('success Video Details');
		return response.data.result || [];
	} catch {
		return [];
	}
};

export interface ICourses {
	courseTitle: string;
	description: string;
	courseSubTitle: string;
	progress: number;
	price: number;
	lessons: number;
	time: number;
	pic: string;
	isEnrolled: boolean;
	endDate: string;
	creatorUserName: string;
	id: number;
}

export interface ICourse {
	courseTitle: string;
	description: string;
	courseSubTitle: string;
	price: number;
	lessons: number;
	time: number;
	pic: string;
	isEnrolled: boolean;
	endDate: string;
	creatorUserName: string;
	courseDetail: ICoursesDetail[];
	section: ISection[];
	isDeleted: boolean;
	deleterUserId: number;
	deletionTime: string;
	lastModificationTime: string;
	lastModifierUserId: number;
	creationTime: string;
	creatorUserId: number;
	id: number;
}

export interface ICoursesDetail {
	description: string;
	type: string;
}

export interface ISection {
	id: number;
	tenantId: number;
	courseID: number;
	sectionTitle: string;
	description: string;
	difficulty: string;
	isEnrolled: boolean;
	lessons: number;
	duration: number;
	endDate: string;
	lecture: ILecture[];
}

export interface ILecture {
	id: number;
	tenantId: number;
	sectionID: number;
	courseID: number;
	title: string;
	description: string;
	difficulty: string;
	path: string;
	length: number;
	sortID: number;
	isWatched: boolean;
}

export const initialCourse: ICourse = {
	courseTitle: '',
	description: '',
	courseSubTitle: '',
	price: 0,
	lessons: 0,
	time: 0,
	pic: '',
	isEnrolled: false,
	endDate: '',
	creatorUserName: '',
	courseDetail: [],
	section: [],
	isDeleted: false,
	deleterUserId: 0,
	deletionTime: '',
	lastModificationTime: '',
	lastModifierUserId: 0,
	creationTime: '',
	creatorUserId: 0,
	id: 0,
};

export const initialCourses: ICourses = {
	id: 0,
	courseTitle: 'Sample Course',
	description: 'This is a sample course',
	courseSubTitle: 'Sample Course Subtitle',
	price: 0,
	lessons: 0,
	time: 0,
	pic: 'sample.jpg',
	isEnrolled: true,
	endDate: '2023-05-16T20:32:02.242Z',
	creatorUserName: 'JohnDoe',
	progress: 0,
};

export const initialCoursesList: ICourses[] = [
	{
		courseTitle: 'Sample Course',
		description: 'This is a sample course',
		courseSubTitle: 'Sample Course Subtitle',
		price: 0,
		lessons: 0,
		time: 0,
		pic: 'sample.jpg',
		isEnrolled: true,
		endDate: '2023-05-16T20:32:02.242Z',
		creatorUserName: 'JohnDoe',
		id: 0,
		progress: 0,
	},
];

export const initialLecture: ILecture = {
	id: 0,
	tenantId: 0,
	sectionID: 0,
	courseID: 0,
	title: '',
	description: '',
	difficulty: '',
	path: '',
	length: 0,
	sortID: 0,
	isWatched: false,
};

interface IVideo {
	id: number;
	tenantId: number;
	sectionID: number;
	courseID: number;
	title: string;
	description: string;
	difficulty: string;
	path: string;
	length: number;
	sortID: number;
	isWatched: boolean;
}

interface IComment {
	comment: string;
	userName: string;
	pic: string;
	creationTime: string;
	creatorUserId: number;
	id: number;
}

export interface IVideoDetails {
	video: IVideo;
	comments: IComment[];
	ratings: number;
}

export const initialVideoDetails: IVideoDetails = {
	video: {
		id: 0,
		tenantId: 0,
		sectionID: 0,
		courseID: 0,
		title: '',
		description: '',
		difficulty: '',
		path: '',
		length: 0,
		sortID: 0,
		isWatched: false,
	},
	comments: [],
	ratings: 0,
};
