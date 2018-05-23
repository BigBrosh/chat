export const noteRoutes = (app, db) => {
	app.post('/notes', (request, response) => {
		response.send('Hello');
	});
};