# doctor_patient_appointment_booking_system_pococare



### Login Credentials

- **Patient Login**
  - Email: jishnurajkarockal@gmail.com
  - Password: 123

- **Doctor Login**
  - Email: kuttu@gmail.com
  - Password: 123

### Deployment

The system has been deployed with the following configurations:

- **Frontend**
  - Live URL: [https://health-care-system-jishnu.netlify.app/](https://health-care-system-jishnu.netlify.app/)

- **Backend**
  - Live URL: [https://health-care-system-backend.onrender.com](https://health-care-system-backend.onrender.com)



# MediConnect API Documentation

This documentation provides an overview of the MediConnect API, including its endpoints, request/response formats, authentication, and authorization requirements.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [API Endpoints](#api-endpoints)
   - [1. User Endpoints](#1-user-endpoints)
   - [2. Appointment Endpoints](#2-appointment-endpoints)
4. [Middleware Functions](#middleware-functions)
   - [1. Authenticator Middleware](#1-authenticator-middleware)
   - [2. Authorizer Middleware](#2-authorizer-middleware)
5. [Installation](#installation)
6. [Environment Variables](#environment-variables)
7. [Dependencies](#dependencies)

## Introduction

The MediConnect API is a backend service for managing appointments between doctors and patients. It provides functionalities for user registration, login, appointment creation, appointment retrieval, and appointment cancellation.

## Getting Started

To get started with the MediConnect API, follow the installation instructions provided in the [Installation](#installation) section. Make sure to set up the required environment variables as mentioned in the [Environment Variables](#environment-variables) section.

## API Endpoints

### 1. User Endpoints

#### `/register` (POST)

Register a new user with the specified information.

- Request body:
  - `name`: Name of the user (string, required).
  - `email`: Email address of the user (string, required).
  - `password`: Password for the user (string, required).
  - `role`: Role of the user (string, required). Possible values: "patient", "doctor", "admin".
  - `specialization`: Specialization of the user (string, required for doctors).
  - `gender`: Gender of the user.

- Authentication: Not required.

- Authorization: Not required.

- Response:
  - Status: 201 
  - Body: None

#### `/login` (POST)

Authenticate user credentials and generate a JSON Web Token (JWT) for authorization.

- Request body:
  - `email`: Email address of the user (string, required).
  - `password`: Password for the user (string, required).

- Authentication: Not required.

- Authorization: Not required.

- Response:
  - Status: 201 
  - Body:
    - `token`: JWT token for authorization (string).

#### `/alluser` (GET)

Fetch all users from the database.

- Request body: None

- Authentication: Required (JWT token).

- Authorization: Required (role: admin).

- Response:
  - Status: 200
  - Body:
    - Array of user objects:
      - `name`: Name of the user (string).
      - `email`: Email address of the user (string).
      - `role`: Role of the user (string).
      - `specialization`: Specialization of the user (string, only for doctors).
      - `gender`: Gender of user.

#### `/doctors` (GET)

Fetch all doctors from the database.

- Request body: None

- Authentication: Required (JWT token).

- Authorization: Not required.

- Response:
  - Status: 200 
  - Body:
    - Array of doctor objects:
      - `name`: Name of the doctor (string).
      - `email`: Email address of the doctor (string).
      - `specialization`: Specialization of the doctor (string).
      - `role`: Role of the user (string).
      - `specialization`: Specialization of the user (string, only for doctors).
      - `gender`: Gender of doctor.

### 2. Appointment Endpoints

#### `/appointment` (POST)

Create a new appointment with the specified details.

- Request body:
  - `patientId`: ID of the patient (string, required).
  - `doctorId`: ID of the doctor (string, required).
  - `date`: Date of the appointment (string, required). Format: "YYYY-MM-DD".
  - `time`: Time of the appointment (string, required). Format: "HH:MM AM/PM".

- Authentication: Required (JWT token).

- Authorization: Required (role: patient).

- Response:
  - Status: 201 
  - Body: None

#### `/appointments` (GET)

Fetch appointments based on the user role (patient or doctor).

- Request body: None

- Authentication: Required (JWT token).

- Authorization: Required (role: patient or doctor).

- Response:
  - Status: 200
  - Body:
    - Array of appointment objects:
      - `patientId`: ID of the patient (string).
      - `doctorId`: ID of the doctor (string).
      - `date`: Date of the appointment (string).
      - `time`: Time of the appointment (string).

#### `/appointment/:id` (DELETE)

Cancel an appointment with the specified ID.

- Request parameters:
  - `id`: ID of the appointment (string, required).

- Authentication: Required (JWT token).

- Authorization: Required (role: patient).

- Response:
  - Status: 200
  - Body: None

## Middleware Functions

### 1. Authenticator Middleware

The `authenticator` middleware function is used to authenticate requests using JWT. It verifies the presence and validity of the JWT token in the request headers.

### 2. Authorizer Middleware

The `authorizer` middleware function is used to authorize requests based on user roles. It checks if the user's role is included in the specified role array.

## Installation

To install and run the MediConnect API locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/Jishnuraj2001/doctor_patient_appointment_booking_system_pococare.git



2. Navigate to the project directory:

   ```shell
   cd backend
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Set up the required environment variables as mentioned in the [Environment Variables](#environment-variables) section.

5. Start the server:

   ```shell
   npm run server
   ```

6. The server will start running at `http://localhost:<port>`, where `<port>` is the value of the `process.env.port` environment variable.

## Environment Variables

The MediConnect API requires the following environment variables to be set:

- `port`: The port number on which the server should run.
- `key`: Secret key used for JWT signing.
- `email_password`: The Secret key used to send mail to the user when an appointment is booked or cancelled.
- `db_url`: MongoDB Atlas cluster URL where you are storing the data.

You can set these variables in a `.env` file in the root directory of the project.

Example `.env` file:

```plaintext
port=3000
key=your-secret-key
email_password=your-email-password
db_url=your-mongodb-url
```

## Dependencies

The MediConnect API relies on the following dependencies:

- express: Fast, unopinionated, minimalist

 web framework for Node.js.
- dotenv: Loads environment variables from a `.env` file into `process.env`.
- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- bcrypt: Library for hashing passwords.
- jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWT).
- mongoose: MongoDB object modeling tool.
- nodemailer: Library for sending emails.
- nodemon: For running the server.

For a complete list of dependencies, refer to the `package.json` file.
