import { createStore } from 'redux';

const initialState = {
	loggedIn: false
};

const mainStore = (state = initialState, action) => {
	switch(action.type)
	{
		case 'LOGGED_IN':
			return Object.assign({}, state, state.loggedIn = true);

		case 'LOGGED_OUT':
			return Object.assign({}, state, state.loggedIn = false);

		default:
			return state;
	}
};

const store = createStore(mainStore);

store.subscribe(() => {
	console.log(store.getState());
});

export default store;