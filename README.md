## Instructions

Run `npm install` after cloning the repo to your local host

Copy .env.examples to .env

- `cp .env.examples .env'

To start dev server with nodemon

- `npm run devStart`

To create role

- `CREATE ROLE sprinter WITH LOGIN PASSWORD 'sprinter';`

To create database

- `CREATE DATABASE sprint with OWNER sprinter;`

To login PSQL

- `\c sprint sprinter;` : You are now connected to database "sprint" as user "sprinter".

To populate/ reset the database

- `npm run db:reset`
