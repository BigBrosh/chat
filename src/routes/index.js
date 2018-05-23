import {noteRoutes} from './note_routes';

const mainRoutes = (app, db) => {
	noteRoutes(app, db);
};

export default mainRoutes;