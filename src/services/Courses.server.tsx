import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, Student_Urls } from '../common/data/constants';

export const getMyCoursesList = async (
	userId: number | undefined,
	accessToken: string | undefined,
) => {
	try {
		const response = await axios.post(
			Student_Urls.GetMyCoursesList,
			{
				filter: 'all',
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
		console.log('success');
		return response.data.result || [];
	} catch {
		return [];
	}
};
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
	courseDetail: ICourseDetail[];
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

export interface ICourseDetail {
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
	courseDetail: [
		{
			description: 'Sample course detail',
			type: 'Type A',
		},
	],
	section: [
		{
			id: 0,
			tenantId: 0,
			courseID: 0,
			sectionTitle: 'Section 1',
			description: 'Sample section description',
			difficulty: 'Easy',
			isEnrolled: true,
			lessons: 0,
			duration: 0,
			endDate: '2023-05-16T20:32:02.242Z',
			lecture: [
				{
					id: 0,
					tenantId: 0,
					sectionID: 0,
					courseID: 0,
					title: 'Lecture 1',
					description: 'Sample lecture description',
					difficulty: 'Easy',
					path: 'sample-video.mp4',
					length: 10,
					sortID: 0,
					isWatched: true,
				},
			],
		},
	],
	isDeleted: true,
	deleterUserId: 0,
	deletionTime: '2023-05-16T20:32:02.242Z',
	lastModificationTime: '2023-05-16T20:32:02.242Z',
	lastModifierUserId: 0,
	creationTime: '2023-05-16T20:32:02.242Z',
	creatorUserId: 0,
	id: 0,
};

export const initialCourseList: ICourse[] = [
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
		courseDetail: [
			{
				description: 'Sample course detail',
				type: 'Type A',
			},
		],
		section: [
			{
				id: 0,
				tenantId: 0,
				courseID: 0,
				sectionTitle: 'Section 1',
				description: 'Sample section description',
				difficulty: 'Easy',
				isEnrolled: true,
				lessons: 0,
				duration: 0,
				endDate: '2023-05-16T20:32:02.242Z',
				lecture: [
					{
						id: 0,
						tenantId: 0,
						sectionID: 0,
						courseID: 0,
						title: 'Lecture 1',
						description: 'Sample lecture description',
						difficulty: 'Easy',
						path: 'sample-video.mp4',
						length: 10,
						sortID: 0,
						isWatched: true,
					},
				],
			},
		],
		isDeleted: true,
		deleterUserId: 0,
		deletionTime: '2023-05-16T20:32:02.242Z',
		lastModificationTime: '2023-05-16T20:32:02.242Z',
		lastModifierUserId: 0,
		creationTime: '2023-05-16T20:32:02.242Z',
		creatorUserId: 0,
		id: 0,
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
