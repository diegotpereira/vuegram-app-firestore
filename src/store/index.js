import Vue from "vue";
import Vuex from 'vuex'

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

    }
})

export default store