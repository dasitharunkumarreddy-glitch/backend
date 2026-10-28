# Lab 02 — Book Management API

## Overview

This project is a REST API for managing a collection of books. It is built using Node.js and Express.js and uses SQLite as the database.

The API supports creating, reading, updating, and deleting book records (CRUD operations).

## Technologies Used

- Node.js
- Express.js
- SQLite
- sqlite
- sqlite3
- nodemon
- Postman

## Project Structure

```text
lab-02/
├── server.js
├── database.db
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
└── screenshots/
```

## Database

The project uses a SQLite database named `database.db`.

The database contains a `book` table with the following columns:

| Column | Description |
|---|---|
| id | Unique book ID; auto-incrementing primary key |
| title | Book title |
| author | Book author |
| price | Book price |
| pages | Number of pages |

The database is seeded with 10 sample books.

## Installation

1. Install Node.js if it is not already installed.
2. Open a terminal in the project folder.
3. Install the project dependencies:

```bash
npm install
```

## Running the Server

Start the development server:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Retrieve all books |
| GET | `/books/:bookId/` | Retrieve a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update a book by ID |
| DELETE | `/books/:bookId/` | Delete a book by ID |

## Example POST Request

**URL:** `http://localhost:3000/books/`

**Method:** `POST`

**Body:** Select `Body` → `raw` → `JSON` in Postman.

```json
{
  "title": "Learning Node.js",
  "author": "Alex Smith",
  "price": 350,
  "pages": 220
}
```

## Testing

The API endpoints are tested using Postman.

Screenshots of the API requests and responses, along with database verification, are saved in the `screenshots/` directory.

## SQL Queries

The API uses parameterized SQL queries to interact with the SQLite database.

## Notes

- Keep the `database.db` file included in the project submission.
- The `node_modules/` directory should not be committed to Git.
- Environment files such as `.env` should not be committed.
