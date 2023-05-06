import { api } from 'boot/axios'

export const doLogin = async ({commit}, payload) => {
    const headers = {
        'Content-Type': 'application/json',
      };
    await api.post('http://localhost:3000/login/', payload, headers).then(response => {
        const token = response.data;
        commit('setToken', token);
        api.defaults.headers.common.Authorization = 'JWT ' + token.access;
    })
}

export const signOut = ({commit}) => {
    api.defaults.headers.common.Authorization = '';
    commit('removeToken')
}

export const getMe = async({commit, dispatch}, token) => {

}

export const init = async ({commit}) => {
    const token = localStorage.getItem('token')
    if(token) await commit('setToken', JSON.parse(token))
    else commit('removeToken')
}
