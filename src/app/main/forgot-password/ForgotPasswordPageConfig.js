import React from 'react';
import {authRoles} from 'app/auth';

export const ForgotPasswordPageConfig = {
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
            path     : '/forgot-password',
            component: React.lazy(() => import('./ForgotPasswordPage'))
        }
    ]
};
