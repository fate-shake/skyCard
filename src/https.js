import axios from 'axios'

import router from './router/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
// const webHost = 'http://192.168.0.67:8080/sim'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // if (config.data) {
  //   config.data.token = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  //   return config
  // } else {
  //   if (config.url.indexOf('?') > 0) {
  //     config.url += '&token='
  //     config.url += 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  //   } else {
  //     config.url += '?token='
  //     config.url += 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  //   }
  // }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.errorcode === 70130) {
    router.push('/login')
  }
  if (response.data.errorcode === 50160) {
    router.push('/login')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default {
// 取消请求
  cancelAjax () {
    return source.token('取消请求')
  },
// 登录
  login (form) {
    return axios.post(`/login`, form)
  },
// 获取用户信息
  getSelf () {
    return axios.get(`/user/self`)
  },
// 所有卡信息查询
  getAllSim () {
    return axios.get(`/card/onoff`)
  },
// 获取卡信息
  searchSim (id) {
    return axios.get(`/card/${id}`)
  },
// 获取卡列表
  getSimList (data) {
    return axios.get(`/card/list?page=${data.page}&pageno=${data.pageno}&own=${data.own || ''}&gsign=${data.gsign || ''}&atime=${data.atime || ''}&genre=${data.genre || ''}&stime=${data.stime || ''}&active=${data.active || ''}`)
  },
// 获取子用户列表
  getSubList (data) {
    if (data) {
      return axios.get(`/user/son?page=${data.page}&pageno=${data.pageno}`)
    } else {
      return axios.get(`/user/son`)
    }
  },
// 添加子用户
  addSubUser (data) {
    return axios.post(`/user`, data)
  },
// 删除子用户
  removeUser (data) {
    return axios.delete(`/user/son/${data.uid}`)
  },
// 修改子用户备注
  editRemark (data) {
    return axios.put(`/user/son`, data)
  },
// 修改子用户备注
  saleCard (data) {
    return axios.post(`/allot`, data)
  },
// 重置密码
  resetPassword (data) {
    return axios.put(`/user/son/pw`, data)
  },
// 获取组列表
  getGroupList (data) {
    return axios.get(`/group`)
  },
// 添加组
  addGroup (data) {
    return axios.post(`/group`, data)
  },
// 获取组内SIM卡
  getGroupSim (data) {
    return axios.get(`/group/cards?gsign=${data.gsign}&page=${data.page}&pageno=${data.pageno}`)
  },
// 移动组SIM卡
  updateGroupSim (data) {
    return axios.put(`/group/cards`, data)
  },
// SIM卡状态
  simState (data) {
    return axios.put(`/card/${data.sim}/status/${data.state}`)
  },
// SIM卡流量状态
  simFlowState (data) {
    return axios.put(`/card/${data.sim}/gprstatus/${data.state}`)
  },
// 修改密码
  editPassword (data) {
    return axios.put(`/user/pw`, data)
  }
}
