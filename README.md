## Advanced TypeScript Backend

This project demonstrates advanced TypeScript concepts applied to building a backend application with Express.js. The project focuses on clean architecture, robust error handling, input validation using decorators, and test-driven development.

### Features

* Middleware Implementation:
    * Request logging
    * Global error handling
* Input Validation: TypeScript decorators (class-validator, class-transformer)
* Service Layer: Encapsulation of business logic
* Unit Testing: Using Jest for test-driven development
* Scalable TypeScript Configuration: Modular file structure for easy scalability

### Project Structure
src/
├── dtos/                # Data Transfer Objects for validation
├── middlewares/         # Express middlewares
├── routes/              # Route definitions
├── services/            # Business logic services
├── utils/               # Utility functions
├── index.ts             # Entry point of the application
tests/
├── UserService.test.ts  # Unit tests for the UserService

### Getting Started

Follow these instructions to set up the project locally.

#### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

#### Installation

1. Clone the repository:
git clone https://github.com/sahilxdev/advanced-typescript-backend.git

2. cd into the project directory:
cd advanced-typescript-backend

3. Install dependencies:
npm install

4. Build the project:
npm run build

5. Start the server:
npm start

#### Scripts

* `npm run build`: Compiles TypeScript files into JavaScript.
* `npm start`: Runs the compiled app.
* `npm run dev`: Starts the app in development mode with hot-reloading (requires ts-node).
* `npm test`: Runs the Jest test suite.

### Endpoints

Base URL: http://localhost:3000

| Method | Endpoint | Description |
|---|---|---|
| POST | /users | Creates a new user |
| GET | /users | Retrieves all users |
| GET | /error | Simulates an error |