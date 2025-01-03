

# Finance Management Dashboard

A user-friendly finance management system built with Chakra UI, ReactJS, Vite, TypeScript, and Tailwind CSS. This project demonstrates frontend development skills by integrating with a pre-built backend for authentication, data visualization, and transaction management.

## Features

### 1. **Landing Page**
- Responsive and visually appealing design.
- **Navigation Bar**: Includes app name, "Login," and "Sign Up" buttons.
- **Hero Section**: Highlights the app’s benefits with a call-to-action for "Sign Up" or "Learn More."

### 2. **Authentication Pages**
- **Sign Up**:
  - Fields: Username, Email, Password, Confirm Password.
  - Validates inputs and sends API requests for registration.
- **Login**:
  - Fields: Email and Password.
  - Validates inputs and authenticates users via the backend API.
  - Redirects users to the dashboard on successful login.

### 3. **Protected Finance Dashboard**
- **Current Balance Widget**: Displays the user’s current balance fetched from the backend API.
- **Recent Transactions**: Lists the latest 5 transactions with details (date, description, amount).
- **Add Transaction Form**:
  - Fields: Description, Amount, Date.
  - Submits transaction data to the backend API.

### 4. **Responsive Design**
- Optimized for mobile, tablet, and desktop layouts.

## Setup Instructions

1. **Clone the Repository**
2. Install Dependencies
   npm install
3. Start the Development Server by running
   npm run dev for frontend
   node server.js for backend
5. Environment Configuration
   Create a .env file in the root directory.
   Add the following environment variables:
   MONGO_URI=add your mongoodb uri.
   JWT_SECRET=add random key.
