# eCommerce API Documentation

This documentation provides an overview of the eCommerce API, which allows users to register, login, manage products, place orders, and perform various operations related to customer management and product transactions.

## Installation

To run the eCommerce API, you need to have the following dependencies installed:

- Node.js (version X.X.X)
- npm (version X.X.X)
- MongoDB (version X.X.X)

Please follow these steps to install and run the API:

1. Clone this repository: `git clone https://github.com/[username]/[repository].git`
2. Navigate to the project directory: `cd [repository]`
3. Install the dependencies: `npm install bcrypt mongoose jsonwebtoken dotenv express`

## Configuration

Before running the API, you need to set up the environment variables:

1. Create a `.env` file in the project root directory.
2. Define the following environment variables in the `.env` file:

   ```
   DB_URL=[your_mongodb_connection_string]
   ```

   Replace `[your_mongodb_connection_string]` with the connection string to your MongoDB database.

## Usage

To start the API server, run the following command:

```
node server.mjs
```

The API server will start running on port 8080 by default. You can access the API endpoints using a tool like cURL, Postman, or any HTTP client.

## API Endpoints

### User Routes

- `POST /api/register`: Register a new user.
- `POST /api/login`: Login a user.

### User Management Routes

- `GET /api/getUser`: Get all users.
- `GET /api/getUser/:id`: Get a user by ID.
- `PATCH /api/updateUser/:id`: Update a user by ID.
- `DELETE /api/deleteUser/:id`: Delete a user by ID.

### Product Routes

- `POST /api/addProduct`: Add a new product.
- `GET /api/getProduct`: Get all products.
- `GET /api/getProduct/:id`: Get a product by ID.
- `PATCH /api/updateProduct/:id`: Update a product by ID.
- `DELETE /api/deleteProduct/:id`: Delete a product by ID.

### Order Routes

- `POST /api/addOrder`: Add a new order.
- `GET /api/getOrder`: Get all orders.
- `GET /api/getOrder/:id`: Get an order by ID.
- `PATCH /api/updateOrder/:id`: Update an order by ID.
- `DELETE /api/deleteOrder/:id`: Delete an order by ID.

Please refer to the code and the route handlers for detailed information on request and response formats.

## Authentication

Authentication is handled using JSON Web Tokens (JWT). Upon successful login, a token is generated and returned in the response. This token should be included in the `Authorization` header for protected routes that require authentication.

## Security

Sensitive information, such as passwords, is securely stored in the database using bcrypt for hashing and salted password encryption.

## Error Handling

The API handles various error scenarios and returns appropriate HTTP status codes and error messages in the response.

## Database Connection

The database connection is established using Mongoose, which provides an Object Data Modeling (ODM) interface for MongoDB. The `dbConnect` function in `dbConnect.mjs` establishes the connection with the MongoDB database using the connection string specified in the `.env` file.

## Logging

The API logs important information, such as successful database connections and errors, to the console.

## Dependencies

The API relies on the following dependencies:

- bcrypt: "^5.1.0"
- dotenv: "^16.3.1"
- express: "^4.18.2"
- jsonwebtoken: "^9.0.1"
- mongoose: "^7.3.1"

Please refer to the `package.json` file for the complete list of dependencies.

## Contributing

Contributions to the eCommerce API project are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on GitHub.

When contributing, please ensure that you follow the existing coding style and conventions. Additionally, provide detailed information about your changes and test them thoroughly.

## Acknowledgements

- Express.js: [https://expressjs.com](https://expressjs.com)
- Mongoose: [https://mongoosejs.com](https://mongoosejs.com)
- bcrypt: [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)
- dotenv: [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
- jsonwebtoken: [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
