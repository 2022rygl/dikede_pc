import request from '@/utils/request'

// 获取验证码
export const updateCodeAPI = (clientToken) =>
  request({
    url: `/user-service/user/imageCode/${clientToken}`,
    method: 'GET'

  })

// 登录接口
export const loginAPI = (data) =>
  request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
