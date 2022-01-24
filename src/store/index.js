import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'


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
        userProfile: {},
        postagens: []
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
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
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // buscar o perfil do usuário e definir no estado
            dispatch('buscarPerfilUsuario', user)
            console.log(user);
        },
        async cadastrar({ dispatch }, form) {
            const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            await fb.colecaoUsuarios.doc(user.uid).set({
                    name: form.name,
                    title: form.title
                })
                //console.log(user);

            // buscar o perfil do usuário e definir no estado
            dispatch('buscarPerfilUsuario', user)
        },
        async buscarPerfilUsuario({ commit }, user) {
            const userProfile = await fb.colecaoUsuarios.doc(user.uid).get()

            commit('setUserProfile', userProfile.data())

            // alterar rota para o painel
            if (router.currentRoute.path === '/login') {
                router.push('/')
            }
        },

        async sair({ commit }) {

            await fb.auth.signOut()

            commit('setUserProfile', {})

            router.push('/login')

        },

        async criarPostagem({ state, commit }, postagem) {

            await fb.colecaoPostagens.add({
                criadaEm: new Date(),
                content: postagem.content,
                userId: fb.auth.currentUser.uid,
                userName: state.userProfile.name,
                comentarios: 0,
                curtidas: 0
            })
            console.log(commit);
        },

        async curtirPostagem({ commit }, postagem) {

            const userId = fb.auth.currentUser.uid
            const docId = `${userId}_${postagem.id}`

            const doc = await fb.colecaoCurtidas.doc(docId).get()

            if (doc.exists) { return }

            await fb.colecaoCurtidas.doc(docId).set({
                postagemId: postagem.id,
                userId: userId
            })

            console.log(commit);

            fb.colecaoPostagens.doc(postagem.id).update({
                curtidas: postagem.contarCurtidas + 1
            })
        },
        async updateProfile({ dispatch }, user) {


            const userId = fb.auth.currentUser.uid

            // atualizar objeto de usuário
            const usuarioRef = await fb.colecaoUsuarios.doc(userId).update({
                name: user.name,
                title: user.title
            })

            console.log(usuarioRef);
            dispatch('buscarPerfilUsuario', { uid: userId })

            const postDocs = await fb.colecaoPostagens.where('userId', '==', userId).get()
            postDocs.forEach(doc => {
                fb.colecaoPostagens.doc(doc.id).update({
                    userName: user.name
                })
            })

            const commentDocs = await fb.colecaoComentarios.where('userId', '==', userId).get()
            commentDocs.forEach(doc => {
                fb.colecaoComentarios.doc(doc.id).update({
                    userName: user.name
                })
            })
        }
    }
})

export default store
//{
//    //namespaced: true,
//    store
//}