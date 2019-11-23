# The Ruksack Project
The Ruksack Project aims to create modern, easy to use and effective registration software for athletic events such as cycling, running and triathalon. Currently, the system is made up of an API written in Express.js, `rucksack-server` and a front end React app `ruksack-client`
## Getting dev environment up and running
Copy `.env.example` to `.env` and configure with your local postgres server.

In `rucksack-client/database`, run `sequelize-cli db:migrate` to setup the database. This also requires that you have sequelize-cli installed on your machine globally.

The API must be running
```
cd ruksack-server && nodemon index.js
```
With the API up you can start the React App
```
cd ruksack-client && nodemon 
```
