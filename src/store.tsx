import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
import sessionSlice from './@features/Authentication/auth.slice';
import commonSlicer from './@features/Common/Common.slice';
import CoursesSlice from './@features/MyCourses/Courses.slice';
import kbSlice from './@features/KnowladgeBase/KbSlice';
let middlewares: any[] = [];

if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require(`redux-logger`);
    const logger = createLogger({
        collapsed: (getState: any, action: any, logEntry: any) => !logEntry.error,
    });

    middlewares.push(logger);
}

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const reducer = combineReducers({
    session: sessionSlice,
    common: commonSlicer,
    myCourses: CoursesSlice,
    knowladgeBaseStore: kbSlice,

});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
    //  enhancers: [composeWithDevTools()],
});



export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
