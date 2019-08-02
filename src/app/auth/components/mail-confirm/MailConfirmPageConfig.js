import React from 'react';

export const MailConfirmPageConfig = {
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
    routes  : [
        {
            path     : '/mail-confirm',
            component: React.lazy(() => import('./MailConfirmPage'))
        }
    ]
};
