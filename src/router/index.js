import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views-reception/Home";
import Login from "@/views-backstage/Login";
import Register from "@/views-backstage/Register";
import AdminHome from "@/views-backstage/AdminHome";
import UserManager from "@/views-backstage/UserManager";
import AdminManager from "@/views-backstage/AdminManager";
import Test from "@/VueComponent/thumsVue";
import GameType from "@/views-backstage/GameType";
import Game from "@/views-backstage/Game";
import PersonCenter from "@/views-backstage/PersonCenter";
import TitleManager from "@/views-backstage/TitleManager";
import ModifyPassword from "@/views-backstage/ModifyPassword";

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
        path: '/modifyPassword',
        name: 'ModifyPassword',
        component: ModifyPassword
      },
      {
        path: '/gameType',
        name: 'GameType',
        component: GameType
      },
      {
        path: '/game',
        name: 'Game',
        component: Game
      },
      {
        path: '/personCenter',
        name: 'PersonCenter',
        component: PersonCenter
      },
      {
        path: '/titleManager',
        name: 'TitleManager',
        component: TitleManager
      }

    ]

  }
]

const router = new VueRouter({
  routes
})

export default router
