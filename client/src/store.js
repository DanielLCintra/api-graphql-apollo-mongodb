import Vue from "vue";
import Vuex from "vuex";
import router from './router'

import { defaultClient as apolloClient } from "./main";

import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER } from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false
  },

  mutations: {
    SET_POSTS: (state, payload) => {
      state.posts = payload;
    },

    SET_USER: (state, payload) => {
      state.user = payload
    },

    SET_LOADING: (state, payload) => {
      state.loading = payload;
    }
  },

  actions: {
    getCurrentUser: ({ commit }) => {
      commit("SET_LOADING", true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({data}) => {
          commit('SET_USER', data.getCurrentUser)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          commit("SET_LOADING", false);
        })

    },

    getPosts: ({ commit }) => {
      commit("SET_LOADING", true);
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data: { getPosts } }) => {
          commit("SET_POSTS", getPosts);
          commit("SET_LOADING", false);
        })
        .catch(error => {
          commit("SET_LOADING", false);
          console.error(error);
        });
    },

    signinUser: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.signinUser.token);
          router.go();
        })
        .catch(error => {
          console.error(error);
        });
    }
  },

  getters: {
    user: state => state.user,
    posts: state => state.posts,
    loading: state => state.loading
  }
});
