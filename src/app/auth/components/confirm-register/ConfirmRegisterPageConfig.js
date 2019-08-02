import React from 'react';
import {authRoles} from 'app/auth';

export const ConfirmRegisterPageConfig = {
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
            path     : '/confirm-register/:username',
            component: React.lazy(() => import('./ConfirmRegisterPage'))
        }
    ]
};
