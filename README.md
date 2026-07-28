# Ledger Service (developnment phase)

A RESTful backend for managing user accounts and ledger-style financial transactions, built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. It provides JWT-based authentication, per-user financial accounts, and a double-entry-inspired transaction/ledger data model designed to keep balance history immutable and auditable.

> **Status:** Under active development. Authentication and account creation are functional; transaction processing and ledger posting are still being built out (see [Project Status](#project-status)).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Project Status](#project-status)
- [Getting Help](#getting-help)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **JWT authentication** — registration and login with hashed passwords (bcrypt) and cookie- or header-based token auth
- **Protected account creation** — authenticated users can open financial accounts with a currency and status (`ACTIVE`, `FROZEN`, `SUSPENDED`)
- **Immutable ledger model** — ledger entries are designed to be append-only; update/delete hooks are blocked at the schema level to preserve an auditable history
- **Idempotent transactions** — the transaction schema enforces a unique `idempotencyKey` to guard against duplicate transfers
- **Email notifications** — welcome emails sent via Nodemailer using Gmail OAuth2
- **Modular architecture** — clear separation between routes, controllers, models, middleware, and services for easy extension

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB via Mongoose |
| Auth | JSON Web Tokens (JWT), bcryptjs |
| Email | Nodemailer (Gmail OAuth2) |
| Config | dotenv |
| Dev tooling | nodemon |

## Project Structure

```text
Ledger-Service/
├── server.js                    # Entry point — starts the DB connection and HTTP server
├── src/
│   ├── app.js                   # Express app setup and route mounting
│   ├── db/
│   │   └── db.js                # MongoDB connection via Mongoose
│   ├── routes/
│   │   ├── auth.routes.js       # /api/auth
│   │   ├── account.routes.js    # /api/account
│   │   └── transaction.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── account.controller.js
│   │   └── transcation.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js   # JWT verification, attaches req.user
│   ├── models/
│   │   ├── user.model.js
│   │   ├── account.model.js
│   │   ├── transaction.model.js
│   │   └── ledger.model.js
│   └── services/
│       └── email.service.js     # Nodemailer welcome-email sender
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB connection string (e.g. MongoDB Atlas)
- A Gmail account configured for OAuth2 if you want outgoing email to work

### Installation

```bash
git clone https://github.com/nitin864/Ledger-Service.git
cd Ledger-Service
npm install
```

### Configure environment variables

Create a `.env` file in the project root (see [Environment Variables](#environment-variables) below).

### Run the server

```bash
# development (auto-restarts with nodemon)
npm run dev

# production
node server.js
```

By default the server listens on the port set in `PORT`, falling back to `3000`.

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (defaults to `3000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `EMAIL_USER` | Gmail address used to send notification emails |
| `CLIENT_ID` | Google OAuth2 client ID (for Nodemailer) |
| `CLIENT_SECRET` | Google OAuth2 client secret |
| `REFRESH_TOKEN` | Google OAuth2 refresh token |

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
REFRESH_TOKEN=your_google_refresh_token
```

## API Overview

All protected routes expect a JWT, either as a `token` cookie (set automatically on login/register) or as a bearer token:

```http
Authorization: Bearer <your_jwt_token>
```

### Auth — `/api/auth`

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/register` | No | Create a new user, returns a JWT cookie and sends a welcome email |
| POST | `/login` | No | Authenticate an existing user and return a JWT cookie |

**Register example:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane@example.com", "password": "secret123"}'
```

### Account — `/api/account`

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/` | Yes | Create a new financial account (`currency`, optional `status`) for the authenticated user |

**Create account example:**

```bash
curl -X POST http://localhost:3000/api/account \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{"currency": "INR"}'
```

## Project Status

This project is a work in progress. Current state of each module:

- ✅ **Auth** — register/login fully implemented
- ✅ **Accounts** — creation implemented and mounted
- 🚧 **Transactions** — data model defined (idempotency key, from/to account, status), but the controller and routes are not yet implemented or mounted in the app
- 🚧 **Ledger** — data model defined with immutability guards (append-only), but posting logic is not yet implemented

## Getting Help

- **Issues & bugs:** open an issue on the [GitHub repository](https://github.com/nitin864/Ledger-Service/issues)
- **Questions or ideas:** start a discussion or reach out via GitHub

## Contributing

Contributions are welcome! Please open an issue to discuss significant changes before submitting a pull request.

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

## Maintainer

**Nitin Raj** — [github.com/nitin864](https://github.com/nitin864)
