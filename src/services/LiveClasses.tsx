import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, Student_Urls } from '../common/data/constants';

export const getLiveClassList = async (studentID: number, accessToken: string | undefined) => {
	try {
		const response = await axios.post(
			Student_Urls.GetLiveClassList,
			{
				studentID: studentID,
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
		console.log('successfully Get Live Session');
		return response.data.result || [];
	} catch {
		(e: any) => console.log(e + 'errore error');
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
