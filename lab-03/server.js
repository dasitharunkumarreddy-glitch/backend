
const express = require("express");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let db;

// GET all books with search, sorting, pagination and price filters
app.get("/books/", async (req, res) => {
    try {
        const {
            search_q = "",
            order_by = "id",
            order = "ASC",
            limit = "10",
            offset = "0",
            min_price,
            max_price,
        } = req.query;

        const allowedColumns = ["id", "title", "author", "price", "pages"];

        if (!allowedColumns.includes(order_by)) {
            return res.status(400).json({ message: "Invalid order_by value" });
        }

        const sortOrder = order.toUpperCase();

        if (!["ASC", "DESC"].includes(sortOrder)) {
            return res.status(400).json({
                message: "Invalid order value. Use ASC or DESC",
            });
        }

        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (
            !Number.isInteger(pageLimit) ||
            pageLimit <= 0 ||
            !Number.isInteger(pageOffset) ||
            pageOffset < 0
        ) {
            return res.status(400).json({
                message: "Invalid limit or offset",
            });
        }

        if (
            (min_price !== undefined && min_price.trim() === "") ||
            (max_price !== undefined && max_price.trim() === "") ||
            (min_price !== undefined && !Number.isFinite(Number(min_price))) ||
            (max_price !== undefined && !Number.isFinite(Number(max_price)))
        ) {
            return res.status(400).json({
                message: "Price filters must be numeric",
            });
        }

        if (
            min_price !== undefined &&
            max_price !== undefined &&
            Number(min_price) > Number(max_price)
        ) {
            return res.status(400).json({
                message: "min_price cannot be greater than max_price",
            });
        }

        let query = "SELECT * FROM book WHERE 1 = 1";
        const params = [];

        if (search_q.trim() !== "") {
            query += " AND title LIKE ?";
            params.push(`%${search_q}%`);
        }

        if (min_price !== undefined) {
            query += " AND price >= ?";
            params.push(Number(min_price));
        }

        if (max_price !== undefined) {
            query += " AND price <= ?";
            params.push(Number(max_price));
        }

        query += ` ORDER BY ${order_by} ${sortOrder} LIMIT ? OFFSET ?`;
        params.push(pageLimit, pageOffset);

        const books = await db.all(query, params);
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: "Unable to retrieve books" });
    }
});

// GET one book
app.get("/books/:bookId/", async (req, res) => {
    try {
        const book = await db.get(
            "SELECT * FROM book WHERE id = ?",
            [req.params.bookId]
        );

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ message: "Unable to retrieve book" });
    }
});

// POST a new book
app.post("/books/", async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        if (
            typeof title !== "string" ||
            title.trim() === "" ||
            typeof author !== "string" ||
            author.trim() === "" ||
            typeof price !== "number" ||
            !Number.isFinite(price)
        ) {
            return res.status(400).json({
                message: "Title, author and numeric price are required",
            });
        }

        if (!Number.isInteger(pages) || pages <= 0) {
            return res.status(400).json({
                message: "Pages must be a positive integer",
            });
        }

        const result = await db.run(
            `INSERT INTO book (title, author, price, pages)
       VALUES (?, ?, ?, ?)`,
            [title.trim(), author.trim(), price, pages]
        );

        return res.status(201).json({
            message: "Book added successfully",
            bookId: result.lastID,
        });
    } catch (error) {
        return res.status(500).json({ message: "Unable to add book" });
    }
});

// PUT update a book
app.put("/books/:bookId/", async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        if (
            typeof title !== "string" ||
            title.trim() === "" ||
            typeof author !== "string" ||
            author.trim() === "" ||
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            !Number.isInteger(pages) ||
            pages <= 0
        ) {
            return res.status(400).json({
                message: "Valid title, author, numeric price and pages are required",
            });
        }

        const existingBook = await db.get(
            "SELECT * FROM book WHERE id = ?",
            [req.params.bookId]
        );

        if (!existingBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        await db.run(
            `UPDATE book SET title = ?, author = ?, price = ?, pages = ?
       WHERE id = ?`,
            [title.trim(), author.trim(), price, pages, req.params.bookId]
        );

        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Unable to update book" });
    }
});

// DELETE a book
app.delete("/books/:bookId/", async (req, res) => {
    try {
        const existingBook = await db.get(
            "SELECT * FROM book WHERE id = ?",
            [req.params.bookId]
        );

        if (!existingBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        await db.run(
            "DELETE FROM book WHERE id = ?",
            [req.params.bookId]
        );

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Unable to delete book" });
    }
});

// Start the server after connecting to the database
const initializeDBAndServer = async () => {
    try {
        db = await sqlite.open({
            filename: "./database.db",
            driver: sqlite3.Database,
        });

        // Create table if it doesn't exist (needed on ephemeral filesystems like Render)
        await db.run(`
            CREATE TABLE IF NOT EXISTS book (
                id     INTEGER PRIMARY KEY AUTOINCREMENT,
                title  TEXT    NOT NULL,
                author TEXT    NOT NULL,
                price  REAL    NOT NULL,
                pages  INTEGER NOT NULL
            )
        `);

        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};

initializeDBAndServer();
