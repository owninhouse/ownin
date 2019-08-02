import React from 'react';
import {authRoles} from 'app/auth';

export const ForgotPasswordSubmitPageConfig = {
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
            path     : '/forgot-password-submit/:username',
            component: React.lazy(() => import('./ForgotPasswordSubmitPage'))
        }
    ]
};
