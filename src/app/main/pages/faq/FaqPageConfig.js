import React from 'react';

export const FaqPageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/faq',
            component: React.lazy(() => import('./FaqPage'))
        }
    ]
};
