import React from 'react';
import {authRoles} from 'app/auth';

export const LoginPageConfig = {
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
            path     : '/login',
            component: React.lazy(() => import('./LoginPage'))
        }
    ]
};
