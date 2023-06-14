import React from 'react';
import { QBANK_URLS } from '../common/data/constants';
import { store } from '../store';
import api from './baseService';

const userId = store.getState().session.Session.userId;
export const getQuestionCount = async () => {
    try {

        const response = await api.get(QBANK_URLS.GetQuestionCount + '?SID=' + userId);
        return (response.data.result || []) as IQuestionModeProp[];
    } catch {
        return [];
    }
};
export const getSystemQuestionCount = async () => {
    try {
        const response = await api.get(QBANK_URLS.GetSystemQuestionCount + '?SID=' + userId);
        return (response.data.result || []) as ISystemProp[];
    } catch {
        return [];
    }
};

export const createTestResult = async (testProp: ICreateTestProp) => {
    try {
        const response = await api.post(QBANK_URLS.CreateTestResult, testProp);
        return response.data.result;
    } catch {
        return 0;
    }
};

export const saveResultDetail = async (testProp: IResultDetailProp) => {
    try {
        const response = await api.post(QBANK_URLS.SaveResultDetail, testProp);
        return response.data.result;
    } catch {
        return 0;
    }
};


export const getQuestionToSolve = async (resultID: number | undefined,) => {
    try {
        const response = await api.get(QBANK_URLS.GetQuestionToSolve + '?ID=' + resultID + '&SID=' + userId);
        return (response.data.result || {}) as IResultProp;
    } catch (error: any) {
        console.log(error);
        return {} as IResultProp;
    }
};

export const getQuestionPapers = async () => {
    try {
        const response = await api.get(QBANK_URLS.GetQuestionPapers + '?SID=' + userId);
        return (response.data.result || []) as IQuestionPapersProp[];
    } catch (error: any) {
        console.log(error);
        return [] as IQuestionPapersProp[];
    }
};

export const getResultList = async () => {
    try {
        const response = await api.get(QBANK_URLS.GetResults + '?SID=' + userId);
        return (response.data.result || []) as IResultProp[];
    } catch (error: any) {
        console.log(error);
        return [] as IResultProp[];
    }
};

export const addRemoveFavourites = async (testProp: IFavouriteProp) => {
    try {
        const response = await api.post(QBANK_URLS.AddRemoveFavourites, testProp);
        return response.data.result;
    } catch {
        return 0;
    }
};

export const createTestResultByPaper = async (paperID: number) => {
    try {
        const response = await api.post(QBANK_URLS.CreateTestResultByPaper + "?paperID=" + paperID, {});
        return response.data.result;
    } catch {
        return 0;
    }
};

export const completed = async (id: number) => {
    try {
        const response = await api.post(QBANK_URLS.Completed, { id: id });
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
    isTrue: boolean,
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

export interface IQuestionPapersProp {

    id: number,
    tenantId: number,
    paperTitle: string,
    time: number,
    expiryDT: Date,
    startDT: Date,
    answerAt: Date,
    marks: number,
    difficultyLevel: number,
    courseId: number,
    sectionId: number,
    packageID: number,
    pic: string,
    notes: string,
    tags: string,
    isSolved: true,
}


