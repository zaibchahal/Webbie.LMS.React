import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, QBank_Urls } from '../common/data/constants';
import api from './baseService';

export const getQuestionCount = async (userId: number | undefined, accessToken: string | undefined,) => {
    try {
        const response = await api.get(
            QBank_Urls.GetQuestionCount + '?SID=' + userId,
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
        return (response.data.result || []) as IQuestionModeProp[];
    } catch {
        return [];
    }
};
export const getSystemQuestionCount = async (userId: number | undefined, accessToken: string | undefined,) => {
    try {
        const response = await api.get(
            QBank_Urls.GetSystemQuestionCount + '?SID=' + userId,
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
        return (response.data.result || []) as ISystemProp[];
    } catch {
        return [];
    }
};

export const createTestResult = async (testProp: ICreateTestProp, accessToken: string | undefined) => {
    try {
        const response = await api.post(QBank_Urls.CreateTestResult, testProp, {
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json-patch+json',
                'X-XSRF-TOKEN': 'null',
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return response.data.result;
    } catch {
        return 0;
    }
};

export const saveResultDetail = async (testProp: IResultDetailProp, accessToken: string | undefined) => {
    try {
        const response = await api.post(QBank_Urls.SaveResultDetail, testProp, {
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json-patch+json',
                'X-XSRF-TOKEN': 'null',
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return response.data.result;
    } catch {
        return 0;
    }
};


export const getQuestionToSolve = async (resultID: number | undefined, userId: number | undefined, accessToken: string | undefined,) => {
    try {
        const response = await api.get(
            QBank_Urls.GetQuestionToSolve + '?ID=' + resultID + '&SID=' + userId,
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
        return (response.data.result || {}) as IResultProp;
    } catch (error: any) {
        console.log(error);
        return {} as IResultProp;
    }
};

export const addRemoveFavourites = async (testProp: IFavouriteProp, accessToken: string | undefined) => {
    try {
        const response = await api.post(QBank_Urls.AddRemoveFavourites, testProp, {
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json-patch+json',
                'X-XSRF-TOKEN': 'null',
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return response.data.result;
    } catch {
        return 0;
    }
};

export interface ICreateTestProp {
    systems: string,
    mode: string,
    questionMode: string,
    maxQPerBlock: number
}
export interface IQuestionModeProp {
    qType: string,
    noOfQ: number
}
export interface ISystemProp {
    id: number
    name: string,
    isChecked: boolean,
    qCount: IQuestionModeProp[]
}



export interface IResultProp {
    paperID: number,
    questionPaper: string,
    obtainedMarks: number,
    totalMarks: number,
    mode: string,
    questionCount: number,
    timeElapsed: number,
    timeGiven: number,
    allowReopen: boolean,
    isComplete: boolean,
    answerAt: Date,
    details: IQuestionProp[],
    creationTime: Date,
    creatorUserId: number,
    id: number

}

export interface IResultDetailProp {
    resultID: number,
    questionID: number,
    answer: string,
    isTrue: boolean
}

export interface IQuestionProp {
    questionId: number,
    question: string,
    answer: string,
    ansExplain: string,
    marks: number,
    isboolean: boolean,
    isPopular: boolean,
    questOptions: IOptionProp[],
    isSolved: boolean
}
export interface IOptionProp {
    optionDetail: string,
    optionText: string,
    isCorrect: boolean,
    IsChecked: boolean
}
export interface IFavouriteProp {
    id: number,
    type: string,//Mcq, Video, Audio, Pdf
    remove: boolean
}


