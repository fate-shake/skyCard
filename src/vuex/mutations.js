import * as type from './mutation-type.js'

export default {
  [type.LOGIN] (state, data) {
    state.userPower = data
  },
  [type.SEARCH_SIM] (state, boolean) {
    state.login = boolean
  },
  [type.SELF_MSG] (state, data) {
    let priv = data.privilege.toString(2)
    let _priv = {}
    _priv.createSon = (priv & 1 << 0) > 0 ? 1 : 0
    _priv.ownCard = (priv & 1 << 1) > 0 ? 1 : 0
    _priv.allotCard = (priv & 1 << 2) > 0 ? 1 : 0
    _priv.checkBill = (priv & 1 << 3) > 0 ? 1 : 0
    _priv.stockCard = (priv & 1 << 4) > 0 ? 1 : 0
    data.privilege = _priv
    state.usermsg = data
  }
}
