import React from 'react';
import { Redirect } from 'react-router-dom';
import { OwnInUtils } from '@ownin';
import { pagesConfigs } from 'app/main/pages/pagesConfigs';
import { authConfigs } from 'app/auth/components/authConfigs';

const routeConfigs = [
    ...pagesConfigs,
    ...authConfigs
];

const routes = [
    ...OwnInUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/home" />
    }
];

export default routes;
