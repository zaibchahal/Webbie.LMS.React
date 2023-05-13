import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, Student_Urls } from '../common/data/constants';

export const getLiveClassList = async (type: number, accessToken: string | undefined) => {
	try {
		const response = await axios.post(Student_Urls.GetLiveClassList, {
			headers: {
				Accept: 'text/plain',
				'Content-Type': 'application/json-patch+json',
				'X-XSRF-TOKEN': 'null',
				Authorization: `Bearer ${accessToken}`,
			},
			withCredentials: true,
		});
		return response.data.result || [];
	} catch {
		return [];
	}
};

export interface ILiveClassList {
	id: number;
	tenantId: number;
	meetingNo: number;
	duration: number;
	packageIDs: 'string';
	courseIDs: 'string';
	topic: 'string';
	description: 'string';
	joinUrl: 'string';
	status: 'string';
	password: 'string';
	startTime: '2023-05-13T10:16:42.648Z';
	jsonData: 'string';
	email: 'string';
	name: 'string';
}
