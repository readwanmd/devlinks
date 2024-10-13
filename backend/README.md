# DevLinks Backend

The backend for **DevLinks**, a platform where users can register, log in, and manage their personal or social media links. This RESTful API is built with **Node.js**, **Express.js**, and **MongoDB**, and it provides a secure authentication system using **JWT**. Users can store, update, and delete their links, and share a custom URL for others to view their profile.

## Tech Stack

- **Node.js** with **Express.js** for server-side logic.
- **MongoDB** and **Mongoose** for database interaction.
- **JWT** (JSON Web Tokens) for secure user authentication.

## API Endpoints

### Auth Routes

- **POST /auth/register**  
  Registers a new user.

- **POST /auth/login**  
  Logs in an existing user and returns a JWT token.

### User Routes

- **PATCH /user/:id**  
  Updates the user information by ID. Authentication required.

- **DELETE /user/:id**  
  Deletes the user by ID. Authentication required.

### Link Routes

- **POST /links**  
  Adds a new link for the authenticated user.

- **GET /links**  
  Retrieves all links for the authenticated user.

- **PUT /links**  
  Updates an existing link for the authenticated user.

- **DELETE /links/:platform**  
  Deletes a specific link (e.g., Twitter, GitHub) for the authenticated user.

### Profile Routes

- **GET /user/:username**  
  Retrieves the public profile of the user by username, including their stored links.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the `backend` folder:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/devlinks
PORT=5000
JWT_SECRET=jwt_secret_key
```

## Setup Instructions

### Prerequisites:

- **Node.js** and **Yarn** installed globally. You can install Yarn with:

```bash
npm install --global yarn
```

### Installation:

1. Clone the repository and navigate to the `backend` folder:

```bash
git clone https://github.com/your-username/devlinks.git
cd devlinks/backend
```

2. Install the dependencies:

```bash
yarn
```

3. Create a `.env` file in the `backend` folder and add the necessary environment variables (see above).

4. Start the backend server:

```bash
yarn dev
```

The server should now be running on `http://localhost:5000`.

## Dependencies

- **Express.js**: Fast, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **JWT**: For secure user authentication.
- **bcrypt.js**: For hashing user passwords.
