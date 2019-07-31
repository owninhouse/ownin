import React from 'react';
import {authRoles} from 'app/auth';

export const ConfirmLoginPageConfig = {
    settings: {
        layout: {
            config: {
                navbar: {
                    display: false
                },
                footer: {
                    display: false
                }
            }
        }
    },
    auth    : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/confirm-login',
            component: React.lazy(() => import('./ConfirmLoginPage'))
        }
    ]
};
