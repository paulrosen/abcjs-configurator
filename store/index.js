import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state: {
			inputAbc: `X:1
K:G			
			`
		},
		getters: {
			inputAbc(state) {
				return state.inputAbc
			}
		},
		mutations: {
			updateInput(state, payload) {
				state.inputAbc = payload;
			}
		}
	})
};
export default createStore