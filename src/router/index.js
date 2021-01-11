import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import axios from 'axios'
import Edit from '../views/Edit.vue'

function adminAuth(to, from, next) {
    if (localStorage.getItem('token')) {
        const req = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.post('http://localhost:8080/validate', {}, req).then((result) => {
            console.log(result)
            next()
        }).catch((error) => {
            console.log(error)
            next('/login')
        });
    } else next('/login')
}


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/admin/users',
        name: 'Users',
        component: Users,
        beforeEnter: adminAuth
    },
    {
        path: '/admin/users/edit/:id',
        name: 'UserEdit',
        component: Edit,
        beforeEnter: adminAuth
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
