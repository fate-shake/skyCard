import Vue from 'vue'
import Router from 'vue-router'

import Vuex from './../vuex/index.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import Frame from '@/views/website/Frame'
import Index from '@/views/website/index'
import Platform from '@/views/website/platform'
import Application from '@/views/website/application'
import Hardware from '@/views/website/hardware'
import ComeSoon from '@/views/website/comeSoon'
import Charge from '@/views/website/charge'
import HardwareCustomization from '@/views/website/hardwareCustomization'
import SoftwareCustomization from '@/views/website/softwareCustomization'
import AppCustomization from '@/views/website/appCustomization'
import About from '@/views/website/about'

import Login from '@/views/website/login'

import Bmsindex from '@/views/bms/index'
import Home from '@/views/bms/home'
import FileUpload from '@/views/bms/fileUpload'
import CardManage from '@/views/bms/cardManage'
import SaleCard from '@/views/bms/saleCard'
import UserManage from '@/views/bms/userManage'

import AdminFrame from '@/views/admin/index'
import AdminHome from '@/views/admin/home'
import AdminSubAccount from '@/views/admin/adminSubAccount'
import SearchAndCharge from '@/views/admin/searchAndCharge'
import AdminCardManage from '@/views/admin/adminCardManage'

Vue.use(Router)
Vue.use(ElementUI)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/website',
      name: 'Frame',
      component: Frame,
      children: [{
        path: '/',
        component: Index
      }, {
        path: '/platform',
        component: Platform
      }, {
        path: '/application',
        component: Application
      }, {
        path: '/hardware',
        component: Hardware
      }, {
        path: '/comeSoon',
        component: ComeSoon
      }, {
        path: '/charge',
        component: Charge
      }, {
        path: '/hardwareCustomization',
        component: HardwareCustomization
      }, {
        path: '/softwareCustomization',
        component: SoftwareCustomization
      }, {
        path: '/appCustomization',
        component: AppCustomization
      }, {
        path: '/about',
        component: About
      }, {
        path: '*',
        redirect: Index
      }]
    }, {
      path: '/Login',
      name: 'login',
      component: Login
    }, {
      path: '/bms',
      component: Bmsindex,
      children: [{
        path: '/bms',
        component: Home
      }, {
        path: '/bms/fileUpload',
        component: FileUpload
      }, {
        path: '/bms/cardManage',
        component: CardManage
      }, {
        path: '/bms/saleCard',
        component: SaleCard
      }, {
        path: '/bms/userManage',
        component: UserManage
      }]
    }, {
      path: '/admin',
      component: AdminFrame,
      children: [{
        path: '/',
        name: '信息总览',
        component: AdminHome
      }, {
        path: '/admin/adminSubAccount',
        name: '子用户',
        component: AdminSubAccount
      }, {
        path: '/admin/searchAndCharge',
        name: '查询与充值',
        component: SearchAndCharge
      }, {
        path: '/admin/adminCardManage',
        name: '卡管理',
        component: AdminCardManage
      }]
    }, {
      path: '*',
      redirect: '/website'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let cookie
  document.cookie.split(';').map((item, index, input) => {
    if (item.indexOf('uType') >= 0) {
      cookie = item.split('=')[1]
    }
  })
  let userPower = Vuex.state.userPower || cookie
  if (to.path.indexOf('bms') >= 0) {
    if (userPower !== '' && (userPower === '0' || userPower === 'gl')) {
      next()
    } else {
      next('/login')
    }
  } else if (to.path.indexOf('admin') >= 0) {
    if (userPower !== '' && userPower === 'jc') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
