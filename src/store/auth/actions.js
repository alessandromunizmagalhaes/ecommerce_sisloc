import { api } from 'boot/axios'
import md5 from 'md5';

export const doLogin = async ({commit}, payload) => {
    let body = {
        email: payload.email,
        senha: md5(payload.senha)
    };
    const headers = {
        'Content-Type': 'application/json',
      };
    await api.post('http://localhost:3000/login/', body, headers).then(response => {
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
