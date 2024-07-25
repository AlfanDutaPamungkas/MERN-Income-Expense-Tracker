# Income Expense Tracker

This is a web application for tracking income and expenses. The frontend is built with React.js, and the backend is built with Express.js. The database used is MongoDB. The project is divided into two main folders: `server` for the backend and `client` for the frontend.

## Features

- **User Registration and Login:** Users can register and log in to their accounts.
- **CRUD Payment Categories:** Users can create, read, update, and delete payment categories.
- **CRUD Payment Transactions:** Users can create, read, update, and delete payment transactions.
- **Income and Expense Chart:** Users can visualize their income and expenses through a chart.

## Project Structure

- `server`: Contains the backend code, built with Express.js.
- `client`: Contains the frontend code, built with React.js.

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/income-expense-tracker.git
   cd income-expense-tracker
2. **Backend Setup:**
    ```bash
    cd server
    npm install
    ```
    Create a .env file in the server folder and add the following environment variables:
    ```bash
    PORT=your_server_port
    MONGO_URL=your_mongo_url
    JWT_KEY=your_JWT_key
    ```
    Start the server:
    ```bash
    node server.js

3. **Frontend Setup:**
    
    Open a new terminal and navigate to the project root:
    ```bash
    cd client
    npm install
    ```
    Start the frontend development server:
    ```bash
    npm run dev
    ```

## Usage
1. Open your browser and go to http://localhost:5173.
2. Register a new account or log in if you already have one.
3. Start managing your income and expenses by adding categories and transactions.
4. Visualize your financial data with the provided charts.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.