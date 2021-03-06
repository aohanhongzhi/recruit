const host = 'http://personfilter.clairezyw.com'
// const host = 'http://192.168.199.147:6200'

export default {
  getCompany () {
    return host + '/company'
  },
  userRegister () {
    return host + '/user'
  },
  getComName () {
    return host + '/company/noPage'
  },
  userLogin () {
    return host + '/user/login'
  },
  getUserInfo () {
    return host + '/user'
  },
  getCodeAd () {
    return host + '/common/code'
  },
  logout () {
    return host + '/user/logout'
  },
  // 提交简历信息
  sendResume () {
    return host + '/resume'
  },
  // 获取投递列表
  deliveryList () {
    return host + '/recruit/send'
  },
  // 提交用户信息
  putUserInfo () {
    return host + '/user/info'
  },
  // 修改用户手机号码
  changePhone () {
    return host + '/user/phone'
  },
  // 修改用户密码
  changePass () {
    return host + '/user/password'
  },
  // 修改用户邮箱
  changeEmail () {
    return host + '/user/email'
  },
  // 获取公司详情
  getCompanyDetail (id) {
    return host + `/company/${id}`
  },
  // 获取简历信息
  getResume () {
    return host + '/resume'
  },
  // 获取岗位详细信息
  getJobDetail (id) {
    return host + `/recruit/${id}`
  },
  // 投递简历
  deliveryReusme () {
    return host + '/recruit/resume'
  },
  // 获取站内信
  getMessage () {
    return host + '/message/user/get'
  },
  // 搜索职位信息
  findJob () {
    return host + '/recruit'
  },
  // 已读
  readMessage () {
    return host + '/message/read'
  },
  // hr resumelist
  receiveResume () {
    return host + '/recruit/receive'
  },
  // hr发布职位信息
  publishJob () {
    return host + '/recruit'
  },
  // 查看hr发布的职位信息
  checkJob () {
    return host + '/recruit/hr'
  },
  deletejob () {
    return host + '/recruit'
  },
  hrRegister () {
    return host + '/user/hr'
  }

}
