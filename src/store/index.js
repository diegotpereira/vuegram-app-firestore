import Vue from "vue";
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from "../router/index";


Vue.use(Vuex)

fb.colecaoPostagens.orderBy('CriadoEm', 'desc').onSnapshot(snapshot => {
    let postsArray = []

    snapshot.forEach(doc => {
        let postagem = doc.data()
        postagem.id = doc.id

        postsArray.push(postagem)
    })

    store.commit('setPostagens', postsArray)
})

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

            console.log(usuario);
            alert("Usuario entrou");
        },
        async cadastrar({ dispatch }, form) {
            const { usuario } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            await fb.colecaoUsuarios.doc(usuario.uid).set({
                nome: form.nome,
                titulo: form.titulo
            })
            console.log(usuario);

            // buscar o perfil do usuário e definir no estado
            dispatch('buscarPerfilUsuario', usuario)
        },
        async buscarPerfilUsuario({ commit }, usuario) {
            const usuarioPerfil = await fb.colecaoUsuarios.doc(usuario.uid).get()
            commit('setUsuarioPerfil', usuarioPerfil.data())

            // alterar rota para o painel
            if (router.currentRoute.path === '/login') {
                router.push('/')
            }
        },

        async sair({ commit }) {

            await fb.auth.signOut()

            commit('setUsuarioPerfil', {})

            router.push('/login')
        },

        async criarPostagem({ state, commit }, postagem) {

            await fb.colecaoPostagens.add({
                criadaEm: new Date(),
                content: postagem.content,
                usuarioId: fb.auth.currentUser.uid,
                usuarioNome: state.usuarioPerfil.nome,
                comentarios: 0,
                curtidas: 0
            })
            console.log(commit);
        },
        async atualizarPerfil({ dispatch }, usuario) {


            const usuarioId = fb.auth.currentUser.uid

            // atualizar objeto de usuário
            const usuarioRef = await fb.colecaoUsuarios.doc(usuarioId).update({
                nome: usuario.nome,
                titulo: usuario.titulo
            })

            console.log(usuarioRef);
            dispatch('buscarPerfilUsuario', { uid: usuarioId })
        }
    }
})

export default store