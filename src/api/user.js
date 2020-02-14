import request from '@/utils/request'
import axios from 'axios'
// 當用戶填寫完賬號和密碼後向服務端驗證是否正確，驗證通過之後，服務端會返回一個token

export function login(data) {
  // 成功回傳這個 {  code: 20000, data: {token: "admin-token"}}
  // 失敗回傳這個 error submit!!
  // request({
  //   url: '/vue-admin-template/user/login',
  //   method: 'post',
  //   data
  // }).then(result => {
  //   console.log(result)
  //   for(let i in result) {
  //     console.log(i, result[i])
  //   }
  // })
  return request({
    url: 'http://localhost:3000/api/auth/login',
    method: 'post',
    data
  })
}

// 前端會根據token再去拉取一個user_info的接口來獲取用戶的詳細信息（如用戶權限，用戶名等等信息）

/* getInfo 取得的格式
{
    code: 20000
    data: {
        roles: ["admin"]
        introduction: "I am a super administrator",
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        name: "Super Admin"
    }
}
*/

export function getInfo(token, username) {
  console.log('token', token)

  const data = {token: token, username: username }

  // axios.post('http://localhost:3000/api/auth/user/info', data)
  // .then(result => {
  //   console.log('custom getInfo', result)
  // })


  return axios.post('http://localhost:3000/api/auth/user/info', data)

  // return request({
  //   url: '/vue-admin-template/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
