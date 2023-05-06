import React, { useEffect, useRef, useContext, useState } from 'react';
import axios from 'axios';
import { AppConst, Profile_Urls } from '../common/data/constants';
import AuthContext from '../contexts/authContext';
const { session } = useContext(AuthContext);


const handleChangePassword = async () => {
    try {
        const response = await axios.get(Profile_Urls.ChangePassword, {
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json-patch+json',
                'X-XSRF-TOKEN': 'null',
                Authorization: `Bearer ${session?.accessToken}`
            },
        })
        var data = response.data.result;
    } catch {
    }
};