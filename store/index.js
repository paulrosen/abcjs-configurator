import Vuex from 'vuex'
const abcjs = process.browser ? require('abcjs/midi.js') : null; // This requires document and window, so can't be used on the server side.

const createStore = () => {
	return new Vuex.Store({
		state: {
			inputAbc: "",
			numberOfTunes: null,
			titles: [],
			ids: [],
			tuneBook: null,
			signature: "",
		},
		getters: {
			signature(state) {
				return state.signature;
			},
			inputAbc(state) {
				return state.inputAbc
			},
			numberOfTunes(state) {
				return state.numberOfTunes;
			},
			titles(state) {
				return state.titles;
			},
			ids(state) {
				return state.ids;
			},
			tuneById: (state) => (id) => {
				return state.tuneBook.getTuneById(id);
			},
			tuneByTitle: (state) => (title) => {
				return state.tuneBook.getTuneByTitle(title);
			},
		},
		mutations: {
			updateInput(state, payload) {
				state.inputAbc = payload;
				if (abcjs) {
					state.numberOfTunes = abcjs.numberOfTunes(state.inputAbc);
					state.tuneBook = new abcjs.TuneBook(state.inputAbc);
					let ids = [];
					let titles = [];
					state.tuneBook.tunes.forEach((tune) => {
						ids.push(tune.id);
						titles.push(tune.title);
					});
					state.ids = ids;
					state.titles = titles;
				}
			},
			setSignature(state) {
				state.signature = abcjs.signature;
			},
		},
		actions: {
			initializeAbcjs: (context, payload) => {
				context.commit("setSignature");
				context.commit("updateInput", payload);
			},

		}
	})
};
export default createStore