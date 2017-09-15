import * as type from './mutation-type.js'
import https from './../https.js'

export default {
  [type.LOGIN] ({ commit, state }, data) {
    return https.login({ uid: data.uid, pw: data.pw }).then(function (res) {
      if (res.data.errorcode === 0) {
        document.cookie = 'login=true'
        document.cookie = 'uType=' + res.data.data
        commit(type.LOGIN, res.data.data)
      }
      return res.data
    }).catch(function () {
    })
  },
  [type.SELF_MSG] ({ commit, state }, data) {
    return https.getSelf().then(function (res) {
      if (res.data.errorcode === 0) {
        commit(type.SELF_MSG, res.data.data)
      }
      return res.data
    }).catch(function () {
    })
  },
  [type.GET_USER_MSG] ({ commit, state }, data) {
    return https.getAllSim().then(function (res) {
      if (res.data.errorcode === 0) {
      }
      return res.data
    }).catch(function (e) {
    })
  },
  [type.SEARCH_SIM] ({ commit, state }, data) {
    return https.searchSim(data).then(function (res) {
      return res.data
    })
  },
  [type.GET_SIM_LIST] ({ commit, state }, data) {
    return https.getSimList(data).then(function (res) {
      return res.data
    }).catch(function () {
    })
  },
  [type.GET_SUB_USER] ({ commit, state }, data) {
    return https.getSubList(data).then(function (res) {
      return res.data
    }).catch(function () {
    })
  },
  [type.ADD_SUB_USER] ({ commit, state }, data) {
    return https.addSubUser(data).then(function (res) {
      return res.data
    }).catch(function () {
    })
  },
  [type.EDIT_REMARK] ({ commit, state }, data) {
    return https.editRemark(data).then(function (res) {
      return res.data
    }).catch(function () {
    })
  },
  [type.SALE_CARD] ({ commit, state }, data) {
    return https.saleCard(data).then(function (res) {
      return res.data
    }).catch(function () {
    })
  },
  [type.RESETPASSWORD] ({ commit, state }, data) {
    return https.resetPassword(data).then(function (res) {
      return res.data
    }).catch(function () {})
  },
  [type.GET_GROUP_LIST] ({ commit, state }, data) {
    return https.getGroupList().then(function (res) {
      return res.data
    }).catch(function () {})
  },
  [type.GET_GROUP_SIM] ({ commit, state }, data) {
    return https.getGroupSim(data).then(function (res) {
      return res.data
    }).catch(function () {})
  },
  [type.REMOVE_USER] ({ commit, state }, data) {
    return https.removeUser(data).then(function (res) {
      return res.data
    }).catch(function () {})
  },
  [type.ADD_GROUP] ({ commit, state }, data) {
    return https.addGroup(data).then(function (res) {
      return res.data
    }).catch(function () {})
  },
  [type.UPDATE_GROUP_SIM] ({ commit, state }, data) {
    return https.updateGroupSim(data).then(function (res) {
      return res.data
    }).catch(function () {})
  },
  [type.SIM_STATE] ({ commit, state }, data) {
    return https.simState(data).then(function (res) {
      return res.data
    }).catch(function () {})
  },
  [type.SIM_FLOW_STATE] ({ commit, state }, data) {
    return https.simFlowState(data).then(function (res) {
      return res.data
    }).catch(function () {})
  },
  [type.EDIT_PASSWORD] ({ commit, state }, data) {
    return https.editPassword(data).then(function (res) {
      return res.data
    }).catch(function () {})
  }
}
