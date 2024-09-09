# Project Overview

The **TO-DO App in Angular** is a full-stack application that allows multiple users to create accounts, authenticate, and manage their tasks efficiently. The app features a responsive user interface built with Angular and a backend API developed using Node.js/Express.

### Key Features

- **User Registration and Authentication**: Users can create accounts, log in, and manage their tasks.
- **Task Management**: Add, edit, delete, and mark tasks as complete.
- **Responsive Design**: Built with a modern UI to provide a seamless experience across devices.

## Project Structure

The project is organized into two main directories:

\`\`\`
/todo-app
├── frontend/    # Angular application
└── backend/     # Backend API server
\`\`\`

## Frontend Setup

The frontend, built with **Angular**, provides a dynamic and interactive user interface.

1. Clone the repository and navigate to the \`frontend\` directory:
   \`\`\`bash
   git clone https://github.com/akshat497/TO-DO-APP-ANGULAR.git
   cd TO-DO-APP-ANGULAR/frontend
   \`\`\`
2. Install dependencies and run the app:
   \`\`\`bash
   npm install
   ng serve
   \`\`\`
   The app will be available at [http://localhost:4200](http://localhost:4200).

## Backend Setup

The backend, powered by **Node.js/Express**, handles user authentication and task management.

1. Navigate to the \`backend\` directory:
   \`\`\`bash
   cd TO-DO-APP-ANGULAR/backend
   \`\`\`
2. Install dependencies and start the server:
   \`\`\`bash
   npm install
   node server.js
   \`\`\`
   The API will be accessible at [http://localhost:3000](http://localhost:3000).

## API Endpoints

- **POST** \`/api/auth/createUser`: Register a new user
- **POST** \`/api/auth/login\`: Authenticate an existing user
- **GET** \`/api/notes/getallnotes\`: Get all notes for the authenticated user
- **POST** \`/api/notes/addnotes\`: Create a new task
- **PUT** \`/api/notes/updatenote/:id\`: Update a task by ID
- **DELETE** \`/api/notes/delete/:id\`: Delete a task by ID

## Contributing

Contributions are welcome! To contribute, please fork the repository, create a new branch, and submit a pull request.

## License

MIT License
" > README.md
