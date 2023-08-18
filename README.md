# Travel Journal Backend

This is the backend for a travel journal system. Users can sign up, log in, request password resets, and reset their passwords.

## Getting Started

1. Clone this repository.
2. Install the required dependencies: `npm install`.
3. Set up your PostgreSQL database and update the connection details in `db/dbConfig.js`.
4. Set environment variables (see below).
5. Start the server: `npm start`.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
DB_HOST=<your_database_host>
DB_PORT=<your_database_port>
DB_NAME=<your_database_name>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
JWT_SECRET=<your_jwt_secret>
EMAIL_SERVICE=<your_email_service_provider>
EMAIL_USER=<your_email_address>
EMAIL_PASS=<your_email_password>
```

## Endpoints

- `POST /auth/signup`: Sign up with email and password.
- `POST /auth/login`: Log in with email and password.
- `POST /auth/forgot-password`: Request a password reset link.
- `POST /auth/reset-password`: Reset the password using a reset token.

## Testing

You can use tools like Postman to test the endpoints.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## License

This project is licensed under the MIT License.
