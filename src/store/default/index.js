import { CHANGE_IS_EXPANSION, SET_CHANNEL_INFO } from './mutation-types';
const module = {
  namespaced: true,
  state: () => ({
    isExpansion: 1,
    channelInfo: {}
  }),
  getters: {
    getIsExpansion (state) {
      return state.isExpansion;
    },
    getChannelInfo (state) {
      return state.channelInfo;
    }
  },
  mutations: {
    [CHANGE_IS_EXPANSION] (state) {
      if (state.isExpansion === 1) {
        state.isExpansion = 0.65;
      } else {
        state.isExpansion = 1;
      }
    },
    [SET_CHANNEL_INFO] (state, channelInfo) {
      state.channelInfo = channelInfo;
    }
  },
  actions: {
    incrementIfOddOnRootSum (context, args) {
      context.commit('ADD_COUNT', args);
    }
  }
};
export default module;
