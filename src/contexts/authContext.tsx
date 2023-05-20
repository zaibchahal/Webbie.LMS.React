import React, { createContext, FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { IUserProps, ISessionProps } from '../common/data/userSessionService';
import { AppConst, PROFILE_URLS } from '../common/data/constants';
import axios from 'axios';

export interface IAuthContextProps {
    userData: Partial<IUserProps>;
    session: Partial<ISessionProps>;
    profilePicture: string;
    handleSetSession: (data: ISessionProps) => void;
    handleSetProfileData: (token: string) => void;
    handleSetProfilePicture: (token: string | undefined) => void;
    handleLogout: () => void;

}
const AuthContext = createContext<Partial<IAuthContextProps>>({});

interface IAuthContextProviderProps {
    children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {

    const getDataFromStorege = (Key: string) => {
        try {
            return JSON.parse(localStorage.getItem(Key) || '{}')
        } catch {
            return {};
        }
    }

    const [session, setSession] = useState<ISessionProps>(getDataFromStorege(AppConst.CurrentSession) as ISessionProps);
    const [userData, setProfileData] = useState<IUserProps>(getDataFromStorege(AppConst.CurrentUser) as IUserProps);
    const [profilePicture, setProfilePicture] = useState<string>(localStorage.getItem(AppConst.ProfilePic) || '');

    const handleSetSession = useCallback((data: ISessionProps) => {
        setSession(data);
        localStorage.setItem(AppConst.CurrentSession, JSON.stringify(data));
    }, []);

    const handleLogout = () => {
        setSession({} as ISessionProps);
        setProfileData({} as IUserProps);
        setProfilePicture("");
        localStorage.setItem(AppConst.CurrentSession, JSON.stringify({}));
        localStorage.setItem(AppConst.CurrentUser, JSON.stringify({}));
        localStorage.setItem(AppConst.ProfilePic, '');
    };

    const handleSetProfilePicture = useCallback(async (token: string | undefined) => {
        try {
            if (!token) {
                token = session.accessToken;
            }
            const response = await axios.get(PROFILE_URLS.GetProfilePicture, {
                headers: {
                    Accept: 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'X-XSRF-TOKEN': 'null',
                    Authorization: `Bearer ${token}`
                },
            });
            var data = `data:image/png;base64,${response.data.result.profilePicture}`;
            setProfilePicture(data);
            localStorage.setItem(AppConst.ProfilePic, data);
        } catch {
            localStorage.setItem(AppConst.ProfilePic, '');
        }
    }, [session.accessToken]);

    const handleSetProfileData = useCallback(async (token: string) => {
        try {
            if (!token) {
                token = session.accessToken;
            }
            handleSetProfilePicture(token);
            const response = await axios.get(PROFILE_URLS.GetCurrentUserProfileForEdit, {
                headers: {
                    Accept: 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'X-XSRF-TOKEN': 'null',
                    Authorization: `Bearer ${token}`
                },
            });
            var data = response.data.result;
            setProfileData(data as IUserProps);
            localStorage.setItem(AppConst.CurrentUser, JSON.stringify(data));
        } catch {
            localStorage.setItem(AppConst.CurrentUser, JSON.stringify({}));
        }
    }, [handleSetProfilePicture, session.accessToken]);


    const value = useMemo(
        () => ({
            session,
            setSession,
            userData,
            handleSetSession,
            handleSetProfileData,
            handleSetProfilePicture,
            profilePicture,
            handleLogout
        }),
        [session, userData, handleSetSession, handleSetProfileData, handleSetProfilePicture, profilePicture],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
