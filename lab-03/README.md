# Lab 3: REST API, Query Parameters, Validation & Debugging

## Student Details

- **Name:** Your Name
- **Registration Number:** Your Registration Number
- **Section:** Your Section
- **Course:** Backend Development Fundamentals

## Objective

To develop a RESTful API for managing books with search, sorting, pagination, price filtering, request validation, appropriate HTTP status codes, and debugging.

## Technologies Used

- Node.js
- Express.js
- SQLite
- Postman
- JavaScript

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd lab-03
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file if required by your project.

Example:

```env
PORT=3000
```

Add any database configuration required by your project.

### 5. Start the server

```bash
npm run dev
```

Server URL:

`http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update an existing book |
| DELETE | `/books/:id` | Delete a book |

### Query Parameters

The GET `/books` endpoint supports:

- `search_q` – Search books by title.
- `order_by` – Sort using a selected field.
- `order` – ASC or DESC.
- `limit` – Maximum number of records.
- `offset` – Number of records to skip.
- `min_price` – Minimum price filter.
- `max_price` – Maximum price filter.

## Request Validation

- Rejects requests with missing titles.
- Rejects requests with missing authors.
- Rejects non-numeric prices.
- Returns HTTP 400 for invalid input.

## HTTP Status Codes

- **200 OK:** Successful retrieval, update or deletion.
- **201 Created:** Book successfully created.
- **400 Bad Request:** Invalid request data.
- **404 Not Found:** Requested book does not exist.

## Screenshots

All screenshots are available in the `screenshots/` folder.

### 1. Server Running
![Server Running](screenshots/01-server-running.png)

### 2. GET All Books
![GET All Books](screenshots/02-get-all-books.png)

### 3. Search Books
![Search Books](screenshots/03-search-books.png)

### 4. Sort Books
![Sort Books](screenshots/04-sort-books.png)

### 5. Pagination
![Pagination](screenshots/05-pagination.png)

### 6. Price Filter
![Price Filter](screenshots/06-price-filter.png)

### 7. Combined Query Parameters
![Combined Query](screenshots/07-combined-query.png)

### 8. Missing Title Validation
![Missing Title](screenshots/08-missing-title.png)

### 9. Invalid Price Validation
![Invalid Price](screenshots/09-invalid-price.png)

### 10. Create Book
![Create Book](screenshots/10-create-book.png)

### 11. Update Book
![Update Book](screenshots/11-update-book.png)

### 12. Delete Book
![Delete Book](screenshots/12-delete-book.png)

### 13. Book Not Found
![Book Not Found](screenshots/13-book-not-found.png)

## Debugging and Problems Faced

- **Port Conflict:** Resolved the EADDRINUSE error by identifying the process using the required port.
- **Wrong Import Path:** Corrected the import path to connect the required files.
- **Table Name Error:** Corrected the database table name.
- **Missing Await:** Added await to handle asynchronous database operations correctly.

## Conclusion

Successfully developed a RESTful Book Management API with search, sorting, pagination, price filtering, validation, and appropriate HTTP status codes. Tested the API using Postman and documented the outputs using screenshots.