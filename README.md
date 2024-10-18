
# Better TaskManager

Welcome to the **Better TaskManager** project! This is a full-featured task management tool designed for efficient task creation, tracking, and organization. It offers a user-friendly experience and several components aimed at improving productivity and making task management seamless. The project is built using **React** for the frontend and **Node.js** with **Express** and **MongoDB** for the backend.

## Features

- **Task Creation and Update**: Easily create new tasks or update existing ones with descriptions, categories, estimated durations, and deadlines.
- **Task Table View**: Provides a comprehensive table view of all tasks with details such as status, starting time, and deadlines.
- **Gantt Chart Visualization**: A visual representation of tasks to track progress using Google Charts.
- **Task Status Management**: Track task status across different stages like PENDING, STARTED, and COMPLETED.
- **Search Functionality**: Search for tasks based on descriptions for easy access and management.
- **Settings Configuration**: Configure maximum allowed working hours per week for better task planning.
- **Responsive Modals and Confirmations**: Utilize modals for creating, updating tasks, and receiving confirmations for actions.

## API Endpoints

The backend server provides several API endpoints for managing tasks and settings. Here is an overview of the available endpoints:

### Task Endpoints

- **POST `/api/post`**: Create a new task with details like description, category, starting time, deadline, estimated duration, and actual duration.
- **GET `/api/getAll`**: Retrieve all tasks along with current setting information.
- **GET `/api/getOne/:id`**: Retrieve a specific task by its ID.
- **PATCH `/api/update/:id`**: Update an existing task by its ID.
- **DELETE `/api/delete/:id`**: Delete a task by its ID.

### Setting Endpoints

- **PATCH `/api/setting`**: Update the weekly hours setting.

The backend ensures that each task is associated with a setting, which helps manage working hours effectively.

## Installation and Running the Project

### Backend Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/better-taskmanager.git
   cd better-taskmanager/backend
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Set up environment variables**: Create a `.env` file in the backend directory and add the following variables:
   ```
   DATABASE_URL=your_mongodb_connection_string
   PORT=3001
   ```
4. **Run the backend server**:
   ```sh
   npm start
   ```
   The backend server will start on [http://localhost:3001](http://localhost:3001).

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```sh
   cd ../frontend
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Run the development server**:
   ```sh
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Usage

- To create a new task, click on the "Create Task" button in the navigation bar.
- Use the task table to view existing tasks, edit them, or mark them as completed.
- Navigate to different views (e.g., Gantt Chart, Timeline) using the navigation bar.

## Contributing

Contributions are welcome! If you would like to contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.
