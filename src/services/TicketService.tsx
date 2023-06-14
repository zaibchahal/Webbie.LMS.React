import React, { useEffect, useRef, useContext, useState } from 'react';
import api from './baseService';
import { AppConst, STUDENT_URLS } from '../common/data/constants';
import { store } from '../store';

const userId = store.getState().session.Session.userId;
export const getTicketList = async (issueTo: number) => {
    try {
        const response = await api.get(STUDENT_URLS.GetTicketList, { IssuedTo: issueTo, UserID: userId } as any);
        console.log(response.data.result);
        return response.data.result || [];
    } catch {
        return [];
    }
};

export const postTicket = async (TicketData: ITicket) => {
    try {
        const response = await api.post(STUDENT_URLS.PostTicket, TicketData);
        return response;
    } catch {
        return [];
    }
};

export const getCategotyDropdown = async () => {
    try {
        const response = await api.get(STUDENT_URLS.SupportCategotyDropdown);
        return response.data.result || [];
    } catch {
        return [];
    }
};

export const getPriorityDropdown = async () => {
    try {
        const response = await api.get(STUDENT_URLS.SupportPriorityDropdown);
        return response.data.result || [];
    } catch {
        return [];
    }
};

export interface ITicket {
    tenantId: number;
    categoryID: number;
    refNo: string;
    tags: string;
    subject: string;
    body: string;
    issuedTo: number;
    priority: number;
    isPopular: boolean;
    status: number;
    category: string;
    creatorUserName: string;
    ticketReply: ITicketReply[];
    id: number;
}

export interface ITicketReply {
    tenantId: number;
    ticketID: number;
    side: number;
    readState: number;
    receiverReadState: number;
    replyBody: string;
    filePath: string;
    creationTime: string;
    creatorUserId: number;
    creatorUserName: string;
}
