import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { IUserProps, ISessionProps } from '../common/data/userSessionService';
import { AppConst, Profile_Urls } from '../common/data/constants';
import axios from 'axios';

export interface IAuthContextProps {
    userData: Partial<IUserProps>;
    session: Partial<ISessionProps>;
    profilePicture: string;
    handleSetSession: (data: ISessionProps) => void;
    handleSetProfileData: (token: string) => void;

}
const AuthContext = createContext<Partial<IAuthContextProps>>({});

interface IAuthContextProviderProps {
    children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
    const [session, setSession] = useState<ISessionProps>(JSON.parse(localStorage.getItem(AppConst.CurrentSession) || '{}') as ISessionProps);
    const [userData, setProfileData] = useState<IUserProps>(JSON.parse(localStorage.getItem(AppConst.CurrentUser) || '{}') as IUserProps);
    const [profilePicture, setProfilePicture] = useState<string>(localStorage.getItem(AppConst.ProfilePic) || '');


    const handleSetSession = (data: ISessionProps) => {
        setSession(data);
        localStorage.setItem(AppConst.CurrentSession, JSON.stringify(data));

    };

    const handleSetProfileData = async (token: string) => {
        try {
            if (!token) {
                token = session.accessToken;
            }
            handleSetProfilePicture(token);
            const response = await axios.get(Profile_Urls.GetCurrentUserProfileForEdit, {
                headers: {
                    Accept: 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'X-XSRF-TOKEN': 'null',
                    Authorization: `Bearer ${token}`
                },
            })
            var data = response.data.result;
            setProfileData(data as IUserProps);
            localStorage.setItem(AppConst.CurrentUser, JSON.stringify(data));
        } catch {
            localStorage.setItem(AppConst.CurrentUser, JSON.stringify({}));
        }
    };

    const handleSetProfilePicture = async (token: string) => {
        try {
            if (!token) {
                token = session.accessToken;
            }
            const response = await axios.get(Profile_Urls.GetProfilePicture, {
                headers: {
                    Accept: 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'X-XSRF-TOKEN': 'null',
                    Authorization: `Bearer ${token}`
                },
            })
            var data = `data:image/png;base64,${response.data.result.profilePicture}`;
            setProfilePicture(data);
            localStorage.setItem(AppConst.ProfilePic, data);
        } catch {
            localStorage.setItem(AppConst.ProfilePic, '');
        }
    };


    const value = useMemo(
        () => ({
            session,
            setSession,
            userData,
            handleSetSession,
            handleSetProfileData,
            profilePicture
        }),
        [session, userData, handleSetSession, handleSetProfileData],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
