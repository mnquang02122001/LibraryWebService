# Book library web services

A nodejs back-end pet project

## Live demo

https://library-sg8r.onrender.com/api/v1

## Features

Authentication, Authorization, CRUD (Admin, Book, BorrowCard, User)

## Tech Stack

**Server:** Nodejs, Expressjs, Typescript

**Database:** Mongodb

## Installation

Clone this repository

```bash
git clone https://github.com/mnquang02122001/LibraryWebService
```

## Run Locally

```bash
  npm install
  npm run build
  npm start
```

## Run with Docker

```bash
  docker-compose build
  docker-compose up -d
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SERVER_PORT` `MONGO_USERNAME` `MONGO_PASSWORD` `NODE_ENV` `JWT_SECRET_KEY` `JWT_EXPIRY_TIME`
