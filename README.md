# Activity Booking API

A simple RESTful API to manage activities like cricket, movies, and football matches. It allows users to register, log in, book activities, and view their bookings.

## Setup & Installation

1. **Clone the repository**  
   `git clone https://github.com/nahada701/activityBookingAPI.git`  
   `cd backend`

2. **Install dependencies**  
   `npm install`

3. **Create a .env file**  
   Add the following environment variables in the `.env` file:  

JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/activity-booking

4. **Start the server**  
`node index.js`  
The server will run on: `http://localhost:3000`

## API Endpoints

### User Routes
- **POST** `/register` — Register a user
- **POST** `/login` — Login and get JWT token

### Activity Routes
- **POST** `/activity/add` — Add an activity
- **GET** `/activity/allActivities` — List all activities
- **POST** `/activity/book/:activityId` — Book an activity (Requires JWT token)

## Note
Make sure to send the **JWT token** in headers when booking an activity:  
`Authorization: Bearer <your_token>`
