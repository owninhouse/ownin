import React from 'react';
import {authRoles} from 'app/auth';

export const RegisterPageConfig = {
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
            path     : '/register',
            component: React.lazy(() => import('./RegisterPage'))
        }
    ]
};
