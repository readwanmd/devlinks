# DevLinks Frontend

The frontend of **DevLinks** is a platform where users can register, log in, and manage all their social media or other personal links in one place. Users can also share a custom link where others can view their profile and access all stored links with a single click. The frontend is built using **React.js** and utilizes **Context API** for state management.

## Tech Stack

- **React.js** for building the user interface.
- **Context API** for managing global state.
- **Vite** for fast development and building the app.

## Features

- **User Authentication**: Users can register and log in with JWT-based authentication.
- **Link Management**: Users can add, edit, and delete their social media or other links.
- **Custom Shareable Profile**: A unique custom link for each user, allowing others to view their profile and access links.
- **Responsive Design**: The application is responsive, ensuring usability across different devices.

## Environment Variables

To run this project, you will need to create a `.env` file in the `frontend` folder with the following variable:

```bash
VITE_SERVER_BASE_URL='http://localhost:5000/api'
```

- `VITE_SERVER_BASE_URL`: The base URL for the backend API. In development, it points to the local backend (`http://localhost:5000/api`).

## Setup Instructions

### Prerequisites:

- **Node.js** and **Yarn** should be installed. You can install Yarn with:

```bash
npm install --global yarn
```

### Installation:

1. Clone the repository and navigate to the `frontend` folder:

```bash
git clone https://github.com/your-username/devlinks.git
cd devlinks/frontend
```

2. Install the dependencies:

```bash
yarn install
```

3. Create a `.env` file in the `frontend` folder and add the following environment variable:

```bash
VITE_SERVER_BASE_URL='http://localhost:5000/api'
```

4. Start the frontend development server:

```bash
yarn dev
```

The frontend should now be running on `http://localhost:5173`.
