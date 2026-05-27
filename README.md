# Espresso Yourself ☕

A full-stack e-commerce web application for purchasing Australian specialty coffee beans online. Built as a group assignment for 32516 Internet Programming, University of Technology Sydney.

---

## Team & Workload Allocation

| Name | Role | Files Written |
|------|------|---------------|
| Emelina Chow | Project Lead, Backend Lead | `server/index.js`, `server/models/Cart.js`, `server/routes/authRoutes.js`, `server/routes/userRoutes.js`, `server/routes/cartRoutes.js`, `server/middleware/authMiddleware.js`, `server/middleware/adminMiddleware.js`, `server/Seed.js`, `client/src/App.jsx`, `client/src/context/AuthProvider.jsx`, `client/src/context/AuthContext.js`, `client/src/context/useAuth.js`, `client/src/api.js`, `client/src/pages/AdminPage.jsx`, `client/src/pages/CartPage.jsx`, `client/src/pages/CheckoutPage.jsx`, `client/src/components/CartSidebar.jsx`, `client/src/components/ProtectedRoute.jsx`. Led all backend development including server setup, JWT authentication system, middleware, database models and API routes. Coordinated overall project delivery and ensured the team's UI/UX design direction was accurately and consistently implemented in code. The higher file count reflects that backend architecture inherently required more files than individual frontend components. |
| Sahil Turbadkar | Frontend Development, UI/UX Design | `client/src/pages/LoginPage.jsx`, `client/src/pages/RegisterPage.jsx`, `client/src/components/AddEditProductModal.jsx`, `client/src/components/DeleteProductModal.jsx`, `client/src/components/NoResults.jsx`. Implemented the login and registration UI, admin product management modals and no results component. Actively contributed to the team's UI/UX design process including designing the authentication flow, form interactions and modal layouts in Figma. |
| Shraddha | Frontend Development, UI/UX Design | `server/models/Product.js`, `server/routes/productRoutes.js`, `client/src/pages/ProductsPage.jsx`, `client/src/pages/ProductDetailPage.jsx`, `client/src/components/Navbar.jsx`, `client/src/pages/SubscribePage.jsx`. Built the product browsing experience including live search, filter and sort functionality. Designed and implemented the navbar, product card layouts, product detail page UI and Subscribe membership tiers page. Actively contributed to the team's UI/UX design process including designing the product cards, navbar and product detail layout in Figma. |
| Khushi | UI/UX Design Lead, Frontend Development | `client/src/pages/ProfilePage.jsx`, `client/src/pages/ErrorPage.jsx`, `client/src/components/HomePage.jsx`, `client/src/components/LoadingSpinner.jsx`, `client/src/pages/OurStoryPage.jsx`, and all landing animation assets in `client/src/assets/`. Led the overall UI/UX design direction aligning all created Figma prototypes, defined the design system and built the scroll-driven landing animation used across the welcome and Our Story pages. |

---

## Design Process

The entire team contributed to the Figma prototype before development began, with Khushi ensuring visual coherence and consistency across all screens. The design process included:

- **Khushi** — led the overall design direction, defined the design system (colour palette, typography, component styles), created the landing animation concept and screen assets, and ensured all designs were cohesive
- **Shraddha** — designed the product browsing experience, product cards, navbar and product detail page layouts
- **Sahil** — designed the authentication flows, login and register pages, modal interactions and form layouts
- **Emelina** — contributed to admin dashboard and cart page designs, and was responsible for ensuring all Figma designs were accurately implemented in code

The design system was applied consistently across the entire codebase, with `Jomhuria` for headings, `Karla` for body text, and a mint green and pale yellow colour palette (`#C5EBDA`, `#F5F5CC`).

---

## Project Description

Espresso Yourself is an Australian coffee bean e-commerce store where customers can browse and purchase specialty coffee products from various roasters. The platform supports full user authentication, product browsing with live search and filtering, cart management, and an admin dashboard for product and order management.

### Problem Solved
Provides a seamless online shopping experience for coffee enthusiasts to discover and purchase specialty Australian coffee beans, with an admin interface to manage the product catalogue and monitor customer activity.

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router DOM v6
- Axios

**Backend**
- Node.js + Express.js v5
- MongoDB Atlas + Mongoose
- bcryptjs — password hashing
- JSON Web Tokens (JWT) — authentication

---

## Features

- User registration and login with JWT authentication
- Role-based access control — customers and admins see different views
- Scroll-driven landing animation on customer login
- Our Story page with brand narrative animation
- Browse and search products by name, roaster or origin
- Filter products by weight variant (250g, 500g, 1kg)
- Sort products by price and name
- Add to cart, update quantity, remove items
- Cart sidebar with live updates
- Checkout confirmation page
- User profile with editable name, email and password
- Membership tiers page with Sipper, Brewer and Roaster tiers
- Points system calculated from cart total — $1 spent = 1 pt
- Membership tab on profile page showing points balance, current tier and progress to next tier
- Admin dashboard with real-time stats
- Admin product management — add, edit, delete products
- View all customer carts in admin dashboard
- Protected routes — unauthenticated users redirected to login

---

## Technical Design Rationale

**`useState` over `useReducer`** — each piece of state (cart items, loading, search term, sort/filter) transitions independently and simply. `useReducer` is better suited to complex interdependent state machines, which this app doesn't have.

**Context API over Redux/Zustand** — auth state (a user object and JWT string) is read widely but changes only on login and logout. Context API is designed for exactly this pattern and avoids unnecessary third-party boilerplate. The context is split into three files (`AuthContext.js`, `AuthProvider.jsx`, `useAuth.js`) to separate the definition, logic, and consumption.

**JWT in localStorage** — auth state is initialised directly from localStorage so it survives page reloads without a network request. The token is attached to every request via an Axios interceptor in `api.js`, so individual components never handle it directly.

**Debounced live search** — a 300ms debounce prevents an API call on every keystroke. Search is server-side (MongoDB handles text matching via `?search=`), while sort and variant filtering run client-side on the returned results — no extra network cost for operations on a small dataset.

**Optimistic cart updates** — after a successful API call, local cart state is updated directly rather than re-fetching the whole cart, keeping quantity changes and removals feeling instant.

**Toast vs persistent errors** — `CartSidebar` uses a transient 3-second toast for cart operation failures (non-blocking, user can keep shopping). `CartPage` uses a persistent error state for the initial load failure, since the page can't render without data.

**Dual-layer route protection** — protected routes check `token` and `user.role` on the frontend via `ProtectedRoute.jsx`, and every sensitive endpoint is independently protected by `authMiddleware.js` and `adminMiddleware.js` on the backend.

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/emelinachow-lgtm/ecommerce-app.git
cd ecommerce-app
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. Seed the database

```bash
node seed.js
```

### 4. Start the server

```bash
node index.js
```

Server runs on `http://localhost:5000`

### 5. Set up the client

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`

---

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Customer | user@espresso.com | userpassword123 |
| Admin | admin@espresso.com | password123 |

> To create an admin account: register a new user then open MongoDB Compass, find the user in the `users` collection and change `role` from `"user"` to `"admin"`.

---

## Folder Structure

```
ecommerce-app/
├── .gitignore                           # Root git ignore
├── README.md                            # Project documentation
├── db/
│   └── products.json                    # Exported seed data (15 products)
├── client/                              # React frontend
│   ├── index.html                       # HTML entry point
│   ├── vite.config.js                   # Vite configuration
│   ├── package.json                     # Client dependencies
│   ├── package-lock.json                # Client dependency lock file
│   ├── public/
│   │   └── favicon.svg                  # Browser tab icon
│   └── src/
│       ├── App.jsx                      # Routes and layout
│       ├── api.js                       # Axios instance with JWT interceptor
│       ├── index.css                    # Global styles and font imports
│       ├── main.jsx                     # React entry point
│       ├── assets/                      # Images and landing animation assets
│       │   ├── coffee-bean.png          # Used in login, register and loading spinner
│       │   ├── iced-coffee.png          # Used in 404 error page
│       │   └── *.webp / *.png           # Scroll-driven landing animation assets
│       ├── components/                  # Reusable components
│       │   ├── Navbar.jsx               # Main navigation bar
│       │   ├── CartSidebar.jsx          # Slide-out cart panel
│       │   ├── HomePage.jsx             # Scroll-driven landing animation
│       │   ├── ProtectedRoute.jsx       # Auth route wrapper
│       │   ├── LoadingSpinner.jsx       # Coffee bean loading animation
│       │   ├── NoResults.jsx            # Empty search state
│       │   ├── AddEditProductModal.jsx  # Admin product form
│       │   └── DeleteProductModal.jsx   # Admin delete confirmation
│       ├── context/                     # Auth context
│       │   ├── AuthContext.js           # Context definition
│       │   ├── AuthProvider.jsx         # Context provider with localStorage persistence
│       │   └── useAuth.js               # Custom hook
│       └── pages/
│           ├── LoginPage.jsx            # Login with JWT
│           ├── ProductsPage.jsx         # Product grid with search and filter
│           ├── ProductDetailPage.jsx    # Single product view
│           ├── CartPage.jsx             # Full cart view
│           ├── CheckoutPage.jsx         # Order confirmation
│           ├── ProfilePage.jsx          # User profile and membership management
│           ├── AdminPage.jsx            # Admin dashboard
│           ├── SubscribePage.jsx        # Membership tiers and points system
│           ├── OurStoryPage.jsx         # Our Story with brand animation
│           ├── ErrorPage.jsx            # 404 page
│           └── RegisterPage.jsx         # New user registration
└── server/                              # Express backend
    ├── .env.example                     # Example environment variables
    ├── .gitignore                       # Server git ignore
    ├── index.js                         # Server entry point
    ├── Seed.js                          # Database seeder (15 products)
    ├── package.json                     # Server dependencies
    ├── package-lock.json                # Server dependency lock file
    ├── middleware/
    │   ├── authMiddleware.js            # JWT verification
    │   └── adminMiddleware.js           # Admin role check
    ├── models/
    │   ├── User.js                      # User schema
    │   ├── Product.js                   # Product schema
    │   └── Cart.js                      # Cart schema with sub-schema
    └── routes/
        ├── authRoutes.js                # POST /register, /login
        ├── userRoutes.js                # GET, PUT, DELETE /users
        ├── productRoutes.js             # CRUD /products
        └── cartRoutes.js                # CRUD /cart
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | None | Register new user |
| POST | `/api/auth/login` | None | Login, returns JWT |
| GET | `/api/users` | Admin | List all users |
| GET | `/api/users/:id` | User | Get own profile |
| PUT | `/api/users/:id` | User | Update profile |
| DELETE | `/api/users/:id` | User | Delete account |
| GET | `/api/products` | None | Get all products, supports `?search=` |
| GET | `/api/products/:id` | None | Get single product |
| POST | `/api/products` | Admin | Add product |
| PUT | `/api/products/:id` | Admin | Edit product |
| DELETE | `/api/products/:id` | Admin | Delete product |
| GET | `/api/cart` | User | Get own cart |
| POST | `/api/cart` | User | Add item to cart |
| PUT | `/api/cart/:itemId` | User | Update item quantity |
| DELETE | `/api/cart/:itemId` | User | Remove item |
| GET | `/api/cart/admin/carts` | Admin | Get all user carts |

---

## Known Limitations

- Checkout flow is a confirmation page only — no real payment processing
- Order history shows current cart items rather than completed orders
- Subscribe/membership points system is calculated from current cart total only, not from completed order history

---

## Notes for Markers

- The `.env` file is excluded from the repository via `.gitignore` for security
- The database is hosted on MongoDB Atlas and shared across all team members
- All API routes are tested and functional
- JWT tokens expire after 7 days
- Role-based access control is enforced on both frontend (protected routes) and backend (middleware)
- The database export at `db/products.json` contains all 15 products and can be used to reseed the database by running `node server/Seed.js`

