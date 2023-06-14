import React, { useEffect, useRef, useContext, useState } from 'react';
import api from './baseService';
import { AppConst, STUDENT_URLS } from '../common/data/constants';

export const getFavouriteList = async (type: number) => {
    try {
        const response = await api.get(STUDENT_URLS.GetFovouritsList + "?ObjectType=" + type)
        return response.data.result || [];
    } catch {
        return [];
    }
};

export interface IFavouriteList {
    objectID: number,
    objectType: string,
    name: string,
    parentName: string,
    created: string,
}