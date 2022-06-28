export default [{
    name: 'redirectlogin',
    path: '/redirectlogin',
    component: () => import('@/views/auth/redirect-login.vue')
}, {
    path: '/automaticLogin',
    name: 'automaticLogin',
    component: () => import('@/views/auth/automatic-login.vue')
}, {
    path: '/noauth',
    name: 'noauth',
    component: () => import('@/views/auth/no-auth.vue')
}, {
    path: '/*',
    name: 'notfound',
    component: () => import('@/views/auth/not-find.vue')
}, {
    path: '/',
    name: 'home',
    redirect: '/example',
    component: () => import('@/views/layout.vue'),
    children: [{
        path: '/example',
        component: () => import('@/views/example/index.vue')
    }]
}]
