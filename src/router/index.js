import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views-reception/Home";
import Login from "@/views-backstage/Login";
import Register from "@/views-backstage/Register";
import AdminHome from "@/views-backstage/AdminHome";
import UserManager from "@/views-backstage/UserManager";
import AdminManager from "@/views-backstage/AdminManager";
import AddUser from "@/views-backstage/AddUser";
import Test from "@/VueComponent/thumsVue";

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/test',
    name:'Tset',
    component: Test
  },
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
      },
      {
        path: '/addUser',
        name: 'AddUser',
        component: AddUser
      }
    ]

  }
]

const router = new VueRouter({
  routes
})

export default router
