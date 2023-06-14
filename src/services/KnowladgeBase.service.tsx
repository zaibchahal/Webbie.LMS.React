import React, { useEffect, useRef, useContext, useState } from 'react';
import api from './baseService';
import { AppConst, STUDENT_URLS } from '../common/data/constants';

export const getKnoladgeBaseList = async () => {
    try {
        const response = await api.get(STUDENT_URLS.GetKnowladgeBase);
        console.log('success');
        return response.data.result || [];
    } catch {
        return [];
    }
};
