import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, Student_Urls } from '../common/data/constants';

export const getFavouriteList = async (type: number, accessToken: string | undefined) => {
    try {
        const response = await axios.get(Student_Urls.GetFovouritsList + "?ObjectType=" + type,
            {
                headers: {
                    Accept: 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'X-XSRF-TOKEN': 'null',
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true,
            })
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