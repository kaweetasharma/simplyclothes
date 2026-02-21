# VogueVibe — Full Stack E-Commerce Platform

A fully functional MERN stack e-commerce application for a clothing store, featuring user authentication, product management, shopping cart, checkout flow, and an admin dashboard.

🔗 **Live Site:** [vogue.sharmakavita.uk](https://vogue.sharmakavita.uk)

![VogueVibe Screenshot](https://raw.githubusercontent.com/kaweetasharma/simplyclothes/main/screenshot.png)
---

## Features

### Customer Facing
- 🛍️ Product listing with category filtering (Jackets, Pants, Shirts)
- 🔍 Product search
- 📄 Individual product detail pages with clean URL routing
- ⭐ Product ratings and reviews
- 🛒 Shopping cart (add, remove, update quantity)
- 🔐 User registration and login with JWT authentication
- 💳 Checkout flow with order summary
- 📦 Order history for logged-in users

### Admin Panel
- Manage products (create, edit, delete)
- View and manage orders
- User management

---

## Tech Stack

### Frontend
- **React** — component-based UI
- **Context API** — global state management (cart, auth)
- **React Router** — client-side routing with dynamic product URLs
- **CSS** — custom styling

### Backend
- **Node.js + Express** — REST API
- **MongoDB + Mongoose** — database and data modelling
- **JWT (JSON Web Tokens)** — secure user authentication
- **bcrypt** — password hashing

---

## Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/kaweetasharma/simplyclothes.git
cd simplyclothes

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `/backend` directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Running the App

```bash
# Run backend (from /backend)
npm start

# Run frontend (from /frontend)
npm start
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5000`.

---

## Project Structure

```
simplyclothes/
├── backend/
│   ├── models/        # Mongoose schemas (User, Product, Order)
│   ├── routes/        # Express API routes
│   ├── middleware/    # Auth middleware (JWT verification)
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # Cart and Auth context providers
│   │   ├── pages/        # Page components
│   │   └── App.js
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login and receive JWT |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/myorders` | Get logged-in user's orders |

---

## Author

**Kavita Sharma** — Self-taught frontend developer based in London, UK

[Portfolio](https://sharmakavita.uk) · [GitHub](https://github.com/kaweetasharma) · [LinkedIn](https://www.linkedin.com/in/kavita-sharma-04ab55187/)
