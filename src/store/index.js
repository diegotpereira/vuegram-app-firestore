import Vue from "vue";
import Vuex from 'vuex'
import * as fb from '../firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userProfile: {},
        posts: []
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setPerformingRequest(state, val) {
            state.setPerformingRequest = val
        },
        setPosts(state, val) {
            state.posts = val
        }
    },
    actions: {
        async cadastrar({ dispatch }, form) {
            const { usuario } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            await fb.colecaoUsuarios.doc(usuario.uid).set({
                nome: form.nome,
                titulo: form.titulo
            })

            dispatch('fetchUserProfile', usuario)
        }
    }
})

export default store