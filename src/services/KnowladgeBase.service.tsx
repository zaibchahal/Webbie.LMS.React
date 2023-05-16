import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, Student_Urls } from '../common/data/constants';

export const getKnoladgeBaseList = async (accessToken: string | undefined) => {
	try {
		const response = await axios.get(Student_Urls.GetKnowladgeBase, {
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
