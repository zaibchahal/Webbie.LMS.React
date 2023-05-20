import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, STUDENT_URLS } from '../common/data/constants';

export const getFaqList = async (accessToken: string | undefined) => {
	try {
		const response = await axios.get(STUDENT_URLS.GetFaq, {
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
