## Instructions

Run `npm install` after cloning the repo to your local host

To start dev server with nodemon

- `npm run devStart`

To create role

- `CREATE USER sprint WITH PASSWORD 'sprinter';`

To create database

- `CREATE DATABASE sprint with OWNER sprinter;`

To login PSQL

- `\c sprint sprinter;` : You are now connected to database "sprint" as user "sprinter".

To populate/ reset the database

- `npm run db:reset`
