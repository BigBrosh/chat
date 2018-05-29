const RequestController = {
	sendToLocal: (request) => {
		for (let key in request)
		{
			localStorage.setItem(key, JSON.stringify(request[key]));
		}
	},

	getFromLocal: place => {
		// input data contains localStorages key's name

		if (localStorage.getItem(place))
		{	
			let a = JSON.parse(localStorage.getItem(place));
			return a;
		}
	}
}

export default RequestController;