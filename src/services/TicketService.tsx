import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, STUDENT_URLS } from '../common/data/constants';

export const getTicketList = async (
    userId: number | undefined,
    issueTo: number,
    accessToken: string | undefined,
) => {
    try {
        const response = await axios.get(STUDENT_URLS.GetTicketList, {
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json-patch+json',
                'X-XSRF-TOKEN': 'null',
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        console.log(response.data.result);
        return response.data.result || [];
    } catch {
        return [];
    }
};

export const postTicket = async (TicketData: ITicket, accessToken: string | undefined) => {
    try {
        const response = await axios.post(STUDENT_URLS.PostTicket, TicketData, {
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json-patch+json',
                'X-XSRF-TOKEN': 'null',
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return response;
    } catch {
        return [];
    }
};

export const getCategotyDropdown = async (accessToken: string | undefined) => {
    try {
        const response = await axios.get(STUDENT_URLS.SupportCategotyDropdown, {
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

export const getPriorityDropdown = async (accessToken: string | undefined) => {
    try {
        const response = await axios.get(STUDENT_URLS.SupportPriorityDropdown, {
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
