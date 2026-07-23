# Backend Ledger Service

A secure and scalable RESTful backend built with **Node.js**, **Express.js**, and **MongoDB** for managing users, authentication, and ledger-related operations. The project includes JWT authentication, email notifications, and a modular architecture for easy maintenance and scalability.

---

## Features

- User Registration & Login
- JWT Authentication
- Password Hashing using bcrypt
- MongoDB Atlas Integration
- Email Notifications using Nodemailer
- RESTful API Architecture
- Environment Variable Configuration
- Error Handling Middleware
- Modular Folder Structure
- Scalable and Maintainable Codebase

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- Nodemailer
- dotenv

---

## Project Structure

```text
ledger_service_backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── .env
├── app.js
├── package.json
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://https://github.com/nitin864/Ledger-Service.git
```

```bash
cd Ledger-Service
```

### Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com

CLIENT_ID=your_google_client_id

CLIENT_SECRET=your_google_client_secret

REFRESH_TOKEN=your_google_refresh_token
```

---

## Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## Authentication

The application uses **JWT Authentication**.

After successful login, a JWT token is generated and should be included in every protected request.

Example:

```http
Authorization: Bearer <your_jwt_token>
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

---

## Email Service

The project uses **Nodemailer** with Gmail OAuth2 to send emails such as:

- Welcome Email
- Registration Confirmation
- Account Notifications

---

## Security

- Password Hashing with bcrypt
- JWT Authentication
- Environment Variables
- Secure MongoDB Connection
- Protected Routes
- Input Validation

---

## Dependencies

```json
express
mongoose
jsonwebtoken
bcrypt
nodemailer
dotenv
cors
```

---

## Future Improvements

- Email Verification
- Password Reset
- Refresh Tokens
- Rate Limiting
- Role-Based Authentication
- Swagger API Documentation
- Unit Testing
- Docker Support
- CI/CD Pipeline

---

## Author

**Nitin Raj**

GitHub: https://github.com/nitin864

---

## License

This project is licensed under the MIT License.

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## Contact

For questions, suggestions, or collaboration, feel free to reach out through GitHub.
