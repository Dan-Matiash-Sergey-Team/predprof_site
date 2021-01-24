import {createRouter, createWebHistory} from "vue-router";
import Login from "../views/Login";
import Register from "../views/Register";
import Main from "../views/Main";
import App from "../App";

const routes = [
    {
        path: '/',
        name: 'Index',
        component: App
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/main',
        name: 'Main',
        component: Main
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
