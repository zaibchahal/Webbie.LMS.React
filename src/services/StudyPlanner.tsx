import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, STUDENT_URLS } from '../common/data/constants';

export const getStudyPlannerList = async (
	userId: number | undefined,
	accessToken: string | undefined,
) => {
	try {
		const response = await axios.get(STUDENT_URLS.GetStudyPlannerList + '?UserId=' + userId, {
			headers: {
				Accept: 'text/plain',
				'Content-Type': 'application/json-patch+json',
				'X-XSRF-TOKEN': 'null',
				Authorization: `Bearer ${accessToken}`,
			},
			withCredentials: true,
		});
		console.log('success');
		return response.data.result || [];
	} catch {
		return [];
	}
};

export const postStudyPlanner = async (
	studyPlannerData: IStudyPlanner,
	accessToken: string | undefined,
) => {
	try {
		const response = await axios.post(STUDENT_URLS.PostStudyPlanner, studyPlannerData, {
			headers: {
				Accept: 'text/plain',
				'Content-Type': 'application/json-patch+json',
				'X-XSRF-TOKEN': 'null',
				Authorization: `Bearer ${accessToken}`,
			},
			withCredentials: true,
		});
		console.log('success');
		return response;
	} catch {
		return console.log('error in post Data');
	}
};

export interface IStudyPlanner {
	tenantId: number;
	title: string;
	description: string;
	dateFrom: string;
	dateTo: string;
	isFullDay: boolean;
	isDeleted: boolean;
	deleterUserId: number;
	deletionTime: string;
	lastModificationTime: string;
	lastModifierUserId: number;
	creationTime: string;
	creatorUserId: number;
	id: number;
}
