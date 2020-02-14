import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     username: '', // username 是我自己加的
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }



// const state = getDefaultState()

const state = {
  username: '', // username 是我自己加的
  roles: [], // roles 是我自己加的
  token: '',
  name: '',
  avatar: ''
}

const mutations = {
  RESET_STATE: (state) => {
    // Object.assign(state, getDefaultState())
    state.username = ''
    state.roles = []
    state.token = getToken()
    state.name = ''
    state.avatar = ''
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log('login response', response)
        const { data } = response

        // 我自己加的 localStorage
        localStorage.setItem('username', userInfo.username)

        console.log('SET_USERNAME', userInfo.username)

        commit('SET_USERNAME', userInfo.username)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const token = state.token

      const username = state.username || localStorage.getItem('username')

      getInfo(token, username).then(response => {
        // const { data } = response
        const data = response.data.data

        console.log('getInfo data', data)

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar, roles, username } = data

        commit('SET_USERNAME', username)
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')

        // 清除 localStorage 的 username
        localStorage.removeItem('username')

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

