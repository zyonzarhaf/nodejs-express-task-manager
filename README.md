# Task manager app built with nodejs/express

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This is a simple task manager web application built with nodejs/express as part of my efforts to better understand the express framework.

## Features
- User authentication with passport.js
- CRUD operations for both users and tasks.
- Filter tasks by priority, status and project (if there is at least one in the db).

## Run Locally
- Ensure you have Node.js installed in your machine.
- Clone the repo to your local machine.
- Install all the dependencies found in package.json.
- [Create an account at mongodb](https://www.mongodb.com/atlas/database).
- Create a new cluster.
- Get the connection URI string for the new cluster, by cliking on the "connect" button next to it's name.
- Create a .env file at the root level of the app, containing both URI= ; and SECRET= ; variables.
- Paste the connection string as the value for the URI variable and give the SECRET variable a value (str of course) of your choice.
- Start the development server by running:
   ```shell
   npm start
   ```
- Access the application in your browser at `http://localhost:3000`.

## Project Structure
The project structure is organized as follows:
```
project-root/
├── controllers
│   ├── errorsController.js
│   ├── homeController.js
│   ├── tasksController.js
│   └── usersController.js
├── db
│   └── connectDB.js
├── errors
│   ├── NotFoundError.js
│   └── UnauthenticatedError.js
├── middleware
│   ├── custom
│   │   ├── async.js
│   │   ├── notFound.js
│   │   ├── redirectView.js
│   │   ├── resLocals.js
│   │   └── validate.js
│   └── standard
│       ├── flash.js
│       ├── json.js
│       ├── layouts.js
│       ├── methodOverride.js
│       ├── passport.js
│       ├── public.js
│       ├── session.js
│       └── urlencoded.js
├── models
│   ├── project.js
│   ├── task.js
│   └── user.js
├── node_modules
├── public
├── routes
├── views
├── .env
├── .gitignore
├── main.js
├── package-lock.json
└── package.json
```
