import React from 'react';
import {Redirect} from 'react-router-dom';
import {OwnInUtils} from '@ownin';
import {pagesConfigs} from 'app/main/pages/pagesConfigs';
import {ForgotPasswordPageConfig} from 'app/main/forgot-password/ForgotPasswordPageConfig';
import {RegisterPageConfig} from 'app/main/register/RegisterPageConfig';
import {ForgotPasswordSubmitPageConfig} from 'app/main/forgot-password-submit/ForgotPasswordSubmitPageConfig';
import {LoginPageConfig} from 'app/main/login/LoginPageConfig';
import {ConfirmLoginPageConfig} from 'app/main/confirm-login/ConfirmLoginPageConfig';
import {ConfirmRegisterPageConfig} from 'app/main/confirm-register/ConfirmRegisterPageConfig';
import {CompleteNewPasswordPageConfig} from 'app/main/complete-new-password/CompleteNewPasswordPageConfig'
import {MailConfirmPageConfig} from 'app/main/mail-confirm/MailConfirmPageConfig';

const routeConfigs = [
    ...pagesConfigs,
    LoginPageConfig,
    ConfirmLoginPageConfig,
    RegisterPageConfig,
    ConfirmRegisterPageConfig,
    ForgotPasswordSubmitPageConfig,
    ForgotPasswordPageConfig,
    CompleteNewPasswordPageConfig,
    MailConfirmPageConfig
];

const routes = [
    ...OwnInUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/home"/>
    }
];

export default routes;
