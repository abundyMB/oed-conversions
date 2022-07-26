/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
// Try to load the .env file

const envPath = path.join(__dirname, '..', '..', '.env');
try {
	fs.accessSync(envPath);
	dotenv.config({ path: envPath });
} catch (err) {
	// TODO: Check if valid env variables are actually loaded despite the lack of a file, only log if they are not
	// console.log("Couldn't load a .env file");
}


const config = {};

// Database configuration is taken from environment variables (which are loaded by dotenv from the .env file)
config.database = {
	user: process.env.OED_DB_USER,
	database: process.env.OED_DB_DATABASE,
	password: process.env.OED_DB_PASSWORD,
	host: process.env.OED_DB_HOST,
	port: process.env.OED_DB_PORT
};

// Mail configuration
let method = process.env.OED_MAIL_METHOD;
if (method !== null && method !== undefined) {
	method = method.toLocaleLowerCase();
}
config.mailer = {
	method: method,
	smtp: process.env.OED_MAIL_SMTP,
	port: process.env.OED_MAIL_SMTP_PORT,
	ident: process.env.OED_MAIL_IDENT,
	credential: process.env.OED_MAIL_CREDENTIAL,
	from: process.env.OED_MAIL_FROM,
	to: process.env.OED_MAIL_TO,
	org: process.env.OED_MAIL_ORG
};

config.secretToken = process.env.OED_TOKEN_SECRET;
config.serverPort = process.env.OED_SERVER_PORT;
config.logFile = process.env.OED_LOG_FILE || 'log.txt';
config.subdir = process.env.OED_SUBDIR || '';

module.exports = config;
