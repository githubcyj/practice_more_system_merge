export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                path: '/user',
                routes: [
                    {
                        name: 'login',
                        path: '/user/login',
                        component: './User/login',
                    },
                ],
            },
        ],
    },
    {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        // component: './TableList',
        component: './FormPage',
    },
    {
        path: '/admin',
        name: 'admin',
        icon: 'crown',
        access: 'canAdmin',
        component: './Admin',
        routes: [
            {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './TableList',
            },
        ],
    },
    {
        name: 'list.table-list',
        icon: 'table',
        path: '/list',
        component: './TestPage',
    },
    {
        path: '/',
        redirect: '/welcome',
    },
    {
        component: './404',
    },
];
