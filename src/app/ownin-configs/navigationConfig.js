import {authRoles} from 'app/auth';
const navigationConfig = [
    // {
    //     'id'      : 'applications',
    //     'title'   : 'Applications',
    //     'type'    : 'group',
    //     'icon'    : 'apps',
    //     'children': [
    //         {
    //             'id'   : 'example-component',
    //             'title': 'Example',
    //             'type' : 'item',
    //             'icon' : 'whatshot',
    //             'url'  : '/example'
    //         }
    //     ]
    // },
    {
        'id'   : 'faq',
        'title': 'Faq',
        'type' : 'item',
        'url'  : '/faq'
    },
    {
        'id'   : 'qualify',
        'title': 'Are you qualified?',
        'type' : 'item',
        'auth' : authRoles.onlyGuest,
        'url'  : '/qualify'
    },
    {
        'id'   : 'dashboard',
        'title': 'Dashboard',
        'type' : 'item',
        'auth' : authRoles.user,
        'icon' : 'dashboard',
        'url'  : '/dashboard'
    },
    {
        'id'   : 'login',
        'title': 'Login',
        'type' : 'item',
        'auth' : authRoles.onlyGuest,
        'icon' : 'perm_identity',
        'url'  : '/login'
    }
];

export default navigationConfig;
