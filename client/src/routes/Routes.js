import React from 'react';
import { useRoutes } from 'react-router-dom';

//Components
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export default function Routes() {

    const element = useRoutes([
        {path: '/', element: <Home /> },
        {path: 'signin', element: <SignIn /> },
        {path: 'signup', element: <SignUp /> }
    ]);

    return element;
};
