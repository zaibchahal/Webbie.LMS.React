import React, { useEffect, useRef, useContext, useState } from 'react';
import api from './baseService';
import { AppConst, STUDENT_URLS } from '../common/data/constants';
import { store } from '../store';

const userId = store.getState().session.Session.userId;
export const getStudyPlannerList = async (


) => {
    try {
        const response = await api.get(STUDENT_URLS.GetStudyPlannerList + '?UserId=' + userId);
        console.log('success');
        return response.data.result || [];
    } catch {
        return [];
    }
};

export const postStudyPlanner = async (
    studyPlannerData: IStudyPlanner,

) => {
    try {
        const response = await api.post(STUDENT_URLS.PostStudyPlanner, studyPlannerData);
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
