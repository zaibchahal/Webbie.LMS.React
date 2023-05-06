import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserDataWithUsername, IUserProps } from '../common/data/userDummyData';
import { AppConst } from '../common/data/constants';

export interface IAuthContextProps {
    user: string;
    setUser?(...args: unknown[]): unknown;
    userData: Partial<IUserProps>;
}
const AuthContext = createContext<Partial<IAuthContextProps>>({});

interface IAuthContextProviderProps {
    children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string>(localStorage.getItem(AppConst.CurrentUser) || '');
    const [userData, setUserData] = useState<Partial<IUserProps>>({});

    useEffect(() => {
        localStorage.setItem(AppConst.CurrentUser, user);
    }, [user]);

    useEffect(() => {
        if (user !== '') {
            setUserData(getUserDataWithUsername(user));
        } else {
            setUserData({});
        }
    }, [user]);

    const value = useMemo(
        () => ({
            user,
            setUser,
            userData,
        }),
        [user, userData],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
