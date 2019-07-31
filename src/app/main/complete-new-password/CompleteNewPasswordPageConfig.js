import React from 'react';
import {authRoles} from 'app/auth';

export const CompleteNewPasswordPageConfig = {
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
            path     : '/complete-new-password',
            component: React.lazy(() => import('./CompleteNewPasswordPage'))
        }
    ]
};
