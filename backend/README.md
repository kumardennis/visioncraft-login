## Installing dependencies

Run `npm install` in `backend` directory to install all required dependencies and devDependencies from `package.json`.

## Starting the server

Run `npm run dev` in `backend` directory to start the server which being watched by `nodemon` to restart server on detected changes.

## Tests

Tests are located in directory `./__tests__`. Run `npm test` in `backend` directory like other commands.

Application uses `Jest` and `Supertest` for testing and the configs can be found in `./jest.config.js` file.

## About

The application consists for 3 API endpoints, `/`, `/signup` and `/signin` to authenticate and log the user inside the client-side application.
