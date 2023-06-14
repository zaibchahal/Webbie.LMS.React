import React, { useEffect, useRef, useContext, useState } from 'react';
import api from './baseService';
import { AppConst, STUDENT_URLS } from '../common/data/constants';

export const getLiveClassList = async (studentID: number) => {
    try {
        const response = await api.post(
            STUDENT_URLS.GetLiveClassList,
            {
                studentID: studentID,
            }
        );
        console.log('successfully Get Live Session');
        return response.data.result || [];
    } catch (e: any) {
        console.log(e + 'errore error');
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
