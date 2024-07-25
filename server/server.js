require("dotenv").config();
const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/users/userRoutes");
const categoryRoutes = require("./routes/categories/categoryRoute");
const transactionRoutes = require("./routes/transactions/transactionsRoute");
const connectDB = require("./config/connectDB.JS");
const globalErrHandler = require("./middlewares/globalErrHandler");

const PORT = process.env.PORT;

const corsOptions = {
    origin:['http://localhost:5174', 'http://localhost:5173']
}

const app = express();

connectDB();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);

app.use(globalErrHandler);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));

