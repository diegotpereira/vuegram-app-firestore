import Vue from "vue";
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from "../router";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        usuarioPerfil: {},
        postagens: []
    },
    mutations: {
        setUsuarioPerfil(state, val) {
            state.usuarioPerfil = val
        },
        setPerformingRequest(state, val) {
            state.setPerformingRequest = val
        },
        setPostagens(state, val) {
            state.postagens = val
        }
    },
    actions: {
        async entrar({ dispatch }, form) {
            // login do usuário
            const { usuario } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // buscar o perfil do usuário e definir no estado
            dispatch('buscarPerfilUsuario', usuario)

            alert("Usuario entrou");
        },
        async cadastrar({ dispatch }, form) {
            const { usuario } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            await fb.colecaoUsuarios.doc(usuario.uid).set({
                nome: form.nome,
                titulo: form.titulo
            })

            // buscar o perfil do usuário e definir no estado
            dispatch('buscarPerfilUsuario', usuario)
        },
        async buscarPerfilUsuario({ commit }, usuario) {
            // buscar perfil de usuário
            const usuarioPerfil = await fb.colecaoUsuarios.doc(usuario.uid).get()

            // definir perfil de usuário no estado
            commit('setUsuarioPerfil', usuarioPerfil.data())

            // alterar rota para o painel
            if (router.currentRoute.path === '/login') {
                router.push('/')
            }
        }
    }
})

export default store