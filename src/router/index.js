import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import AdminHome from "@/views/AdminHome";
import UserManager from "@/views/UserManager";
import AdminManager from "@/views/AdminManager";

Vue.use(VueRouter)

const routes = [
  {
    path:'/home',
    name:'Home',
    component:Home
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
    path: '/adminHome',
    name: 'AdminHome',
    component: AdminHome,
    children:[
      {
        path:'/userManager',
        name:'UserManager',
        component:UserManager
      },
      {
        path: '/adminManager',
        name: 'AdminManager',
        component: AdminManager
      }
    ]

  }
]

const router = new VueRouter({
  routes
})

export default router
