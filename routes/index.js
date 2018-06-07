/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var express = require('express');
var nodemailer = require('nodemailer');
var path = require('path');
var importRoutes = keystone.importer(__dirname);
//STATIC FOLDER
var app = express();

app.use('/public', express.static(path.join(__dirname + '/public')));

// var apiHandlers = require('./api/announcement');
var routes = {
	views: importRoutes('./views'),
};

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);




// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.home);
	// app.get('/', routes.views.index);
	// app.get('/announcement', routes.views.announcement);
	app.get('/register', routes.views.register);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);

	// API Routes
	// app.get('/api/announcement', apiHandlers.getAnnouncements);
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);




	// <li>Treatment: ${req.body.treatment}</li>

	app.post('/send', (req, res) => {
		const output = `<p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>


      <li>Subject: ${req.body.subject}</li>
      <li>Message: ${req.body.message}</li>
      </ul>`;

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.google.com',
			port: 25, //587
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.MAIL_USER, // generated ethereal user
				pass: process.env.MAIL_PASS // generated ethereal password
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// setup email data with unicode symbols
		let mailOptions = {
			from: process.env.MAIL_FROM, // sender address
			to: process.env.MAIL_TO, // list of receivers
			subject: 'Contact request', // Subject line
			text: 'Hello world', // plain text body
			html: output // html body
		};

		// send mail with defined transport object


		transporter.sendMail(mailOptions, (error, info) => {

			if (error) {
				return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);

			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

			res.render('partials/thanks', { businessName: 'Tanty Mauvais' });



		});

	});


	app.listen()

};


