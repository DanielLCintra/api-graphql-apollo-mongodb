import Vue from "vue";
import Vuex from "vuex";

import { defaultClient as apolloClient } from "./main";

import { GET_POSTS } from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },

  mutations: {
    SET_POSTS: (state, payload) => {
      state.posts = payload;
    },

    SET_LOADING: (state, payload) => {
      state.loading = payload;
    }
  },

  actions: {
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
    }
  },

  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  }
});
