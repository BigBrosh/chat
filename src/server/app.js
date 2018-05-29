import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../configs/config.json';

import * as db from './utils/dataBaseUtils';

const app = express();

db.setUpConnection();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));


app.get('/users', (req, res) => {
	db.listUsers()
	.then(data => res.send(data));
});

app.post('/users', (req, res) => {
	if (req.body.action === 'register')
	{
		return db.findUser(req.body.data.name).then(response => {
			if (response.length === 0)
			{
				db.createUser(req.body.data);
				res.sendStatus(200);				
			}

			else
				res.sendStatus(404);
		});		
	}

	else if (req.body.action === 'login')
	{
		db.findUser(req.body.data.name).then(response => {
			if (response.length !== 0)
			{
				if (response[0].password !== req.body.data.password)
					res.sendStatus(403);

				else
					res.sendStatus(200);
			}

			else
				res.sendStatus(404);
		});

	}
});

// app.delete('/users/:id', (req, res) => {
// 	db.deleteUser(req.params.id).then(data => res.send(data));
// });

const server = app.listen(serverPort, () => {
	console.log(`Server is running on port ${serverPort}`);
});