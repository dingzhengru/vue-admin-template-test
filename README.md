# 前端任務 vue-admin-template

## 使用 vue-admin-template 完成以下功能

*  前後端的權限管理
    *  5個功能頁
        *  設定權限頁
        *  功能頁A
        *  功能頁B
        *  功能頁C
        *  功能頁D
    *  3種角色
        *  admin : 擁有5個功能頁的權限，可以設定其它成員的權限
        *  user1  : 
        *  user2  : 
    *  由後端取得登入角色的權限列表，在登入的api，傳給前端


## 登入規則
*  實現登錄和權限驗證的思路: https://juejin.im/post/591aa14f570c35006961acac#heading-0
*  預設 username 放在 utils/validate.js (admin, editor)
*  預設會把 登入資料 傳到 api/user.js 中的網址('/vue-admin-template/user/login')
*  登入資料正確，會回傳 token { code: 20000, data: {token: "admin-token"}} 或是 { code: 20000, data: {token: "editor-token"}}
*  登入成功會使用 getInfo 取使用者資料
```
// admin 用 getInfo 取到的資料
{
    code: 20000
    data: {
        roles: ["admin"]
        introduction: "I am a super administrator",
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        name: "Super Admin"
    }
}
```
## 權限
*  router/index.js 中可以對每個路徑設置權限 meta.roles ['admin','editor'] 
*  目前猜想: roles 的權限內容，是可以自己填入，只要對應到 getInfo 的使用者資料的 roles 即可
