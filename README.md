# FAMILY TRAVEL TRACKER

**FAMILY TRAVEL TRACKER** is a web application built with Express and PostgreSQL that helps families track and manage the countries they have visited. The application allows users to add new family members, view their information, and record the countries they have visited. This project serves as a practical demonstration of using PostgreSQL with a Node.js application.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Learnings](#learnings)

## Project Overview

The FAMILY TRAVEL TRACKER application is designed to help users manage information about their family members and the countries they have traveled to. It leverages an Express server for handling HTTP requests and a PostgreSQL database for storing user and travel data.

## Features

- **User Management**: Add and manage family members.
- **Travel Tracking**: Record and view the countries each family member has visited.
- **Error Handling**: Displays error messages for invalid operations, such as adding a duplicate country.

## Project Structure

The project is organized into the following structure:

- **`server.js`**: Main server file where the Express app is configured and routes are defined.
- **`views/`**: Contains EJS templates for rendering HTML pages.
  - **`index.ejs`**: Displays user information and visited countries.
  - **`new.ejs`**: Form for adding a new family member.
- **`public/`**: Static files such as CSS and JavaScript.

## Usage

To run this project:

1. Ensure you have PostgreSQL installed and running.
2. Create a PostgreSQL database named `World`.
3. Set up the required tables in your database (`all_users`, `all_users_visited_countries`, `countries_list`).
4. Configure the database connection details in the `server.js` file.
5. Run the server with the command: `node server.js`.

Navigate to `http://localhost:3000` in your browser to interact with the application.

## Learnings

This project provided valuable experience with PostgreSQL, including:

- Connecting to and querying a PostgreSQL database using the `pg` library.
- Performing CRUD operations with PostgreSQL in a Node.js environment.
- Implementing error handling and validation for user inputs and database interactions.
