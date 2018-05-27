import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../configs/config.json';

import * as db from './utils/dataBaseUtils';

const app = express();

db.setUpConnection();

app.use(bodyParser.json());

// db.createUser({name: 'BigBrosh'});

app.get('/users', (req, res) => {
	db.listUsers().then(data => res.send(data));
});

// app.post('/users', (req, res) => {
// 	db.createUser(req.body).then(data => res.send(data));
// });

// app.delete('/users/:id', (req, res) => {
// 	db.deleteUser(req.params.id).then(data => res.send(data));
// });

const server = app.listen(serverPort, () => {
	console.log(`Server is running on port ${serverPort}`);
});