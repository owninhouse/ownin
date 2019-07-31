import React from 'react';

export const QualifyConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/qualify',
            component: React.lazy(() => import('./Qualify'))
        }
    ]
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
