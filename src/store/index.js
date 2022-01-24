import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'


Vue.use(Vuex)

// firebase em tempo real
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
            state.performingRequest = val
            console.log(state);
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
        },
        async cadastrar({ dispatch }, form) {
            const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            // criar objeto de usuário em colecaoUsuarios
            await fb.colecaoUsuarios.doc(user.uid).set({
                nome: form.nome,
                titulo: form.titulo
            })

            // buscar o perfil do usuário e definir no estado
            dispatch('buscarPerfilUsuario', user)
        },
        async buscarPerfilUsuario({ commit }, user) {
            // buscar perfil de usuário
            const usuarioPerfil = await fb.colecaoUsuarios.doc(user.uid).get()

            // definir perfil de usuário no estado
            commit('setUsuarioPerfil', usuarioPerfil.data())

            // alterar rota para o painel
            if (router.currentRoute.path === '/login') {
                router.push('/')
            }
        },

        async sair({ commit }) {

            // sair do usuário
            await fb.auth.signOut()

            // limpar dados do usuário (state)
            commit('setUsuarioPerfil', {})

            // redirecionar para visualização de login
            router.push('/login')

        },

        async criarPostagem({ state, commit }, postagem) {

            // criar postagem em firebase
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

        async curtirPostagem({ commit }, postagem) {

            const usuarioId = fb.auth.currentUser.uid
            const docId = `${usuarioId}_${postagem.id}`

            // verificar se o usuário gostou do post
            const doc = await fb.colecaoCurtidas.doc(docId).get()

            if (doc.exists) { return }

            // cria postagem
            await fb.colecaoCurtidas.doc(docId).set({
                postagemId: postagem.id,
                usuarioId: usuarioId
            })

            console.log(commit);

            fb.colecaoPostagens.doc(postagem.id).update({
                curtidas: postagem.contarCurtidas + 1
            })
        },
        async alterarPerfil({ dispatch }, usuario) {


            const usuarioId = fb.auth.currentUser.uid

            // atualizar objeto de usuário
            const usuarioRef = await fb.colecaoUsuarios.doc(usuarioId).update({
                nome: usuario.nome,
                titulo: usuario.titulo
            })

            console.log(usuarioRef);
            dispatch('buscarPerfilUsuario', { uid: usuarioId })

            // atualizar todas as postagens por usuário
            const postDocs = await fb.colecaoPostagens.where('usuarioId', '==', usuarioId).get()
            postDocs.forEach(doc => {
                fb.colecaoPostagens.doc(doc.id).update({
                    usuarioNome: usuario.nome
                })
            })

            // atualizar todos os comentários por usuário
            const commentDocs = await fb.colecaoComentarios.where('usuarioId', '==', usuarioId).get()
            commentDocs.forEach(doc => {
                fb.colecaoComentarios.doc(doc.id).update({
                    usuarioNome: usuario.nome
                })
            })
        }
    }
})

export default store