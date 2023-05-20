import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, STUDENT_URLS } from '../common/data/constants';

export const getKnoladgeBaseList = async (accessToken: string | undefined) => {
	try {
		const response = await axios.get(STUDENT_URLS.GetKnowladgeBase, {
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
