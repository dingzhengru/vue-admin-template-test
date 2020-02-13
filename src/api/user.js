import request from '@/utils/request'

// 當用戶填寫完賬號和密碼後向服務端驗證是否正確，驗證通過之後，服務端會返回一個token

export function login(data) {
  // 成功回傳這個 {  code: 20000, data: {token: "admin-token"}}
  // 失敗回傳這個 error submit!!
  request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  }).then(result => {
    console.log(result)
    for(let i in result) {
      console.log(i, result[i])
    }
  })
  return request({
    url: 'http://localhost:3000/api/auth/login',
    method: 'post',
    data
  })
}

// 前端會根據token再去拉取一個user_info的接口來獲取用戶的詳細信息（如用戶權限，用戶名等等信息）

export function getInfo(token) {

  request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  }).then(result => {
    console.log('getInfo', result)
    console.log(result)
  })

  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  request({
    url: '/vue-admin-template/user/logout',
    method: 'post',
  }).then(result => {
    console.log('logout', result)
    console.log(result)
  })
  
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
