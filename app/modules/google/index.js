const { google } = require('googleapis');
const controllers = require('./controllers/controllers.js');
const configs = require('../../../config/configs.js');

const googleAuth = new google.auth.JWT(
	configs.Sheets.email,
	configs.Sheets.keyFile,
	configs.Sheets.key,
	configs.Sheets.scopes);
google.options({ auth: googleAuth });

const googleClient = {};
googleClient.sheets = google.sheets({ version: configs.Sheets.version });
googleClient.sheetsControllers = controllers;

module.exports = googleClient;