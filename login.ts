import express from 'express';
import session  from 'express-session';
const path = require('path');
const client = require('./connection/connection.js');

const app = express();

client.connect(function (err: any) {
	if (err) throw err;
	console.log("Connected!");
});
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function (request: express.Request,response: express.Response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/index.html'));
});
//Login huudasnaas sign up darahad
app.post('/Signup', function (request: express.Request,response: express.Response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/index.html'));
});

// http://localhost:3000/auth Login submit hiih uildel
app.post('/auth1', function (request: express.Request, response: express.Response) {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {
		client.query('SELECT * FROM accounts WHERE username = $1 AND password = $2', [username, password], function (error: any, results: any, fields: any) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists

			if (results.rowCount>0 && request.session) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/auth2', function (request: express.Request, response: express.Response) {
	let username = request.body.username;
	let password = request.body.password;
	let email    = request.body.email;
	
	if (username && password && email) {
		client.query('SELECT * FROM accounts WHERE username = $1 AND password = $2', [username, password], function (error: any, results: any, fields: any) {
			if (error) throw error;
			if (results.rowCount>0 && request.session) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				client.query('INSERT INTO accounts (username,password,email) VALUES ($1, $2,$3)', [username,password,email],function(error: any, results: any, fields: any){
				})
				response.redirect('/confirmation');
			}
			response.end();
		});
	}
}
);

app.get('/home', function (request: express.Request, response: express.Response) {
	
	if (request.session?.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	}else {
		response.send('Please login to view this page!');
	} 
	response.end();
});

app.get('/confirmation', function (request: express.Request, response: express.Response) {
	// If the user is loggedin
	response.send('Account Created!');
	response.end();
});
app.listen(3000);
