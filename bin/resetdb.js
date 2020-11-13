// load .env data into process.env
require('dotenv').config();

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const Client = require('pg-native');

// PG connection setup
const connectionString =
	process.env.DATABASE_URL ||
	`postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const client = new Client();

// Loads the schema files from migration/schema
const runSchemaFiles = function () {
	console.log(chalk.cyan(`-> Loading Schema Files ...`));
	const schemaFilenames = fs.readdirSync('./migration/schema');

	for (const fn of schemaFilenames) {
		const sql = fs.readFileSync(`./migration/schema/${fn}`, 'utf8');
		console.log(`\t-> Running ${chalk.green(fn)}`);
		client.querySync(sql);
	}
};

const runSeedFiles = function () {
	console.log(chalk.cyan(`-> Loading Seeds ...`));
	const schemaFilenames = fs.readdirSync('./migration/seeds');

	for (const fn of schemaFilenames) {
		const sql = fs.readFileSync(`./migration/seeds/${fn}`, 'utf8');
		console.log(`\t-> Running ${chalk.green(fn)}`);
		client.querySync(sql);
	}
};

try {
	console.log(`-> Connecting to PG using ${connectionString} ...`);
	client.connectSync(connectionString);
	console.log('past connect');
	runSchemaFiles();
	console.log('past schemas run');
	runSeedFiles();
	console.log('past seeds run');
	client.end();
} catch (err) {
	console.error(chalk.red(`Failed due to error: ${err}`));
	client.end();
	console.log('doubt it gets here');
}
