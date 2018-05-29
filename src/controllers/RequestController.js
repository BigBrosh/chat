const RequestController = {
	sendToLocal: (place, request) => {		
		localStorage.setItem(place, JSON.stringify(request));
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