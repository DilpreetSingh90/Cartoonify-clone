# Cartoonify-clone

## Introduction
This project is a fullstack JavaScript application running on node.js. The technology stack is as follows:
- **React** for the front-end, bootstrapped with vite.
- **express.js** for the server
  - Serves the React app 
  - Provides the Rapid API for the React app using http
- **MongoDB** for the database to store the api results. 

The app is fully deployable to any PaaS like Heroku or AWS Elastic Beanstalk that understands how to build and run projects with a **package.json** file. 

## Development

During development of the React app, use **npm run dev** or simply navigate to the client folder and run **npm start**. Remember you need the server running as well for it to work.

If you want reload-functionality for the server code, I recommend using something like [nodemon](https://www.npmjs.com/package/nodemon). You can then navigate to the server folder and start it using **nodemon**. 

Before deploying, build and start the app, and test that everything works on http://localhost:5173. The react app should open when you visit http://localhost:5173 in the browser and the API should be available on http://localhost:3000/api/cartoon.
