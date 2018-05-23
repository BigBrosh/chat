import mainRoutes from '../routes/index';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

const port = 4000;
mainRoutes(app, {});
app.listen(port, () => {
	console.log(`we are on ${port}`);
});