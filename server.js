const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const saltRounds = 10;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
  		ssl: true,
	}
});

// creating express app 
const app = express();
// creating a middleware for parsing requests from client
app.use(bodyParser.json());
// app.use(cors());

// creating a root get route 
app.get('/', (req, res) => { res.send('this is working!') })

// creating a post route for signin
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt, saltRounds) })

// creating a post route for register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) })

// creating a get route
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

// creating a put route for updating count of no of visits by a user
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})