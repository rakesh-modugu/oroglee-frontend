# Dentist Appointment Booking App 🦷

Hi! 👋 This is a Full-Stack (MERN) web application that I built for my frontend internship assignment. 

The main idea of this project is to create a simple and clean platform where patients can book dental appointments, and the clinic admin can manage those bookings easily.

## 🔗 Live Links (Deployed)
I have deployed both the frontend and backend so you can test it directly!
* **Frontend Website (Vercel):** [Insert your Vercel URL here]
* **Backend API (Render):** [Insert your Render URL here]

---

## 🛠️ Tech Stack Used
* **Frontend:** React.js, Vite, Tailwind CSS (for styling)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud Database)

---

## ✨ Features I Built

**For Users (Patients):**
* Users can view the available doctors on the home page.
* They can click on "Book Appointment" and fill out a simple form (Name, Phone, Date).
* Once booked, the data is safely stored in the database.

**For Admin (Clinic Staff):**
* A separate Admin page to view all the appointments in one place.
* **Update Status:** Admin can click "Mark Done" to change the patient's status from 'Booked' to 'Completed'.
* **Delete:** If an appointment is cancelled, the admin can delete the record from the database.

---

## 💻 How to Run This Project on Your Laptop

If you want to run this code locally on your machine, just follow these simple steps:

### 1. Backend Setup
1. Open a terminal and go to the `backend` folder: `cd backend`
2. Install the packages: `npm install`
3. Create a `.env` file in the backend folder and add your MongoDB connection string like this:
   `MONGO_URI=your_mongodb_password_link_here`
   `PORT=5000`
4. Start the server: `node server.js` (or `nodemon server.js`)
*Note: The backend will run on http://localhost:5000*

### 2. Frontend Setup
1. Open a new, second terminal and go to the `frontend` folder: `cd frontend`
2. Install the packages: `npm install`
3. Since the code is currently pointing to my live backend, if you want to test it locally, change the API URLs in `Home.jsx`, `Admin.jsx`, and `BookingModal.jsx` back to `http://localhost:5000`.
4. Start the React app: `npm run dev`
5. Open the local link provided by Vite in your browser.

---

Thank you for checking out my project! Building this helped me learn a lot about connecting React with a Node.js backend and deploying them to the cloud. Let me know if you have any feedback! 🚀
