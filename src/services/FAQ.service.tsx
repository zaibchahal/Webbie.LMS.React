import React, { useEffect, useRef, useContext, useState } from 'react';
import api from './baseService';
import { AppConst, STUDENT_URLS } from '../common/data/constants';

export const getFaqList = async () => {
    try {
        const response = await api.get(STUDENT_URLS.GetFaq);
        return response.data.result || [];
    } catch {
        return [];
    }
};
