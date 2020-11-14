import Vue from 'vue';
import Vuex from 'vuex';
import { filter } from 'lodash';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		yearData: [],
	},
	mutations: {
		setData(state, addData) {
			state.yearData.length = 0;
			state.yearData = addData;
		},
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		setData({ state, commit }, addData) {
			commit('setData', addData);
		},
	},
	getters: {
		getYearData(state) {
			return state.yearData;
		},
		filterGetData: state => localCode => {
			return filter(state.yearData, { 아파트: decodeURIComponent(localCode) });
		},
	},
});
