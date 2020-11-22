## Instructions

Run `npm install` after cloning the repo to your local host

Copy .env.examples to .env

- `cp .env.examples .env'

Database set up (psql required)

1. run `psql`
2. run `CREATE USER sprint WITH PASSWORD 'sprinter';` set up user
3. run `CREATE DATABASE sprint with OWNER sprinter;`
4. run `\c sprint sprinter;`

To load schema and seed files

1. in node run `npm run db:reset`
   OR
1. run `psql -U sprinter -d sprint`
1. run `\i migration/schema/schema.sql` to load schema
1. run `\i migration/seeds/seeds01_users.sql` to ...`\i migration/seeds/seeds05_karmas.sql`

To start dev server with nodemon

- `npm run devStart`

To build js files and run server

- `npm build`
- `npm start`

Testing for Mathius
