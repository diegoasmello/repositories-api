# Repositories API

A simple API build with Express.js for searching repositories in Github API.

### Setup

Install dependencies

`npm install`

Copy env files and set environment variables

`cp .env.example .env`

Start the dev server

`npm start`

Backend will run on the port `3001`. Open [http://localhost:3001](http://localhost:3001) to view in your browser.

### Route examples

Open [http://localhost:3001/search/node](http://localhost:3001/search/node) to view repositories containing "node".

Open [http://localhost:3001/repository/facebook/react](http://localhost:3001/repository/facebook/react) to view information about the ReactJS repository and other [Facebook](https://github.com/facebook) repositories.
