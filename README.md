# CotiZen

CotiZen is a powerful dashboard designed to streamline the management of payments and apartments for syndics. Built using ReactJs for the front end and NodeJs for the backend, CotiZen provides a user-friendly interface to handle various tasks related to apartment management and financial transactions.

## Features

1. **Authentication System:**
   - User authentication with login and logout functionality.

2. **Data Display:**
   - View information about apartments, payments, and invoices.

3. **Data Manipulation:**
   - Create new apartments and record payments.
   - Automatic generation of invoices for seamless financial tracking.

4. **Data Management:**
   - Update apartment details.
   - Delete apartments.

5. **Document Printing:**
   - Print invoices and payment receipts.

## Libraries Used

### Frontend (ReactJs)
- **@react-pdf/renderer:** for PDF generation.
- **axios:** for handling HTTP requests.
- **file-saver:** for saving files on the client side.
- **pdfjs-dist:** for working with PDF files.
- **react, react-dom:** core React libraries.
- **react-redux:** for state management.
- **react-router-dom:** for client-side routing.
- **redux:** for application state management.
- **redux-thunk:** middleware for handling asynchronous actions.

### Backend (NodeJs)
- **@faker-js/faker:** for generating fake data.
- **bcryptjs:** for password hashing.
- **cookie-parser:** for parsing cookies.
- **cors:** for handling Cross-Origin Resource Sharing.
- **dotenv:** for environment variable management.
- **express:** for building the web server.
- **jest:** for testing.
- **joi:** for input validation.
- **jsonwebtoken:** for creating and verifying JSON Web Tokens.
- **mongodb, mongoose:** for MongoDB database integration.
- **node-cron:** for scheduling tasks.
- **nodemon:** for automatic server restarts during development.
- **supertest:** for testing HTTP requests.
- **validator:** for data validation.

## Getting Started

To run CotiZen on your local machine, follow these steps:

### Server Setup:

```bash
# Navigate to the ./Server directory
cd ./Server

# Copy the .example.env file to .env
cp .example.env .env

# Generate secret keys
npm run generate:jwt_secret

# Install server dependencies
npm install

# Start the server
npm run dev
```

### Client Setup:

```bash
# Navigate to the ../client directory
cd ../client

# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

CotiZen will be accessible at `localhost:5173`. Use the credentials `{"syndic@admin.admin", "admin123"}` to log in and explore the features.

Feel free to explore and enhance CotiZen to suit your specific needs!
