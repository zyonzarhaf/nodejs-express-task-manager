# Task manager app built with nodejs/express

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Run Locally](#prerequisites)
- [Project Structure](#project-structure)

## Introduction
This is a simple task manager web application built with nodejs/express as part of my efforts to better understand the express framework.

## Features
- User authentication with passport.js
- CRUD operations for users and their tasks.

## Run Locally
- Ensure you have Node.js installed in your machine.
- Clone the repo to your local machine.
- Install all the dependencies found in package.json.
- [Create an account at mongodb](https://www.mongodb.com/atlas/database).
- Create a new cluster.
- Get the connection URI string for the new cluster by cliking on the "connect" button next to it's name.
- Create a .env file at the root level of the app, containing both URI and SECRET vars.
- Assign the connection string to the URI var and assign a string of your choice to the SECRET var.
- Start the server by running:
   ```shell
   npm start
   ```
- Access the application in your browser at `http://localhost:3000`.

## Project Structure
The project structure is organized as follows:
```
project-root/
├── .git/
├── api/
│   ├── controllers/
│   │   ├── errorsController.js
│   │   ├── tasksController.js
│   │   └── usersController.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── taskApiRoutes.js
│   │   └── userApiRoutes.js
│   └── tests/
│       ├── api.test.js
│       └── setuptestdb.js
├── controllers/
│   ├── errorsController.js
│   ├── homeController.js
│   ├── tasksController.js
│   └── usersController.js
├── db/
│   └── connectDB.js
├── errors/
│   ├── BadRequestError.js
│   ├── InvalidTokenError.js
│   ├── NotFoundError.js
│   └── UnauthenticatedError.js
├── helpers/
│   └── helpers.js
├── middleware/
│   ├── custom/
│   │   ├── async.js
│   │   ├── checkContentType.js
│   │   ├── checkUserAuth.js
│   │   ├── notFound.js
│   │   ├── notFoundResponse.js
│   │   ├── redirectView.js
│   │   ├── resLocals.js
│   │   ├── validate.js
│   │   └── validators.js
│   └── standard/
│       ├── flash.js
│       ├── json.js
│       ├── layouts.js
│       ├── methodOverride.js
│       ├── passport.js
│       ├── public.js
│       ├── session.js
│       └── urlencoded.js
├── models/
│   ├── project.js
│   ├── task.js
│   └── user.js
├── public/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   └── styles.css
│   └── js/
│       ├── app.js
│       └── bootstrap.bundle.min.js
├── routes/
│   ├── homeRoutes.js
│   ├── index.js
│   ├── setRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
└── views/
    ├── error/
    │   ├── index.ejs
    │   ├── InternalServerError.ejs
    │   ├── NotFoundError.ejs
    │   └── UnauthenticatedError.ejs
    ├── home/
    │   └── index.ejs
    └── task/
        ├── partials/
        │   ├── editModal.ejs
        │   └── newModal.ejs
        ├── edit.ejs
        ├── new.ejs
        └── tasks.ejs

├── .gitignore
├── LICENSE
├── main.js
├── package-lock.json
├── package.json
├── README.md

```
