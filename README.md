Challenge 1: Job Application Tracker (MERN Stack)

A simple web application where users can:
1. View a list of companies.
2. Mark companies as Target or Not Target.
3. Status is saved per user and updates in real time.
4. Users can register, log in, and their choices are saved in a MongoDB database.

💡 Features:
JWT Authentication with secure httpOnly cookies.
Company status management (Target / Not Target).
MongoDB as the database.
React frontend for smooth UI interaction.
Protected routes with user-specific company data.

.env File:
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Frontend & Backend Setup: npm install & npm run dev

-------------------------------**********************---------------------------------

Challenge 2: LinkedIn Profile Enhancer Widget (Chrome Extension)
A Chrome extension that injects a floating widget on LinkedIn profile pages.

💡 Features:
Displays Company Name, Match Score (with a progress bar), and Account Status (colored tag).
UI injected via content.js.
Uses chrome.storage.sync to save toggle state (show/hide widget).
Responsive design for ~300px width.
Uses static sample JSON data.

Sample data:
{
  "companyName": "TechCorp",
  "matchScore": 86,
  "accountStatus": "Target"
}

How to Install:
Open Chrome and go to chrome://extensions/.
Enable Developer Mode (top-right).
Click Load Unpacked and select the challenge-2-linkedin-widget folder.
Visit a LinkedIn profile page — the widget will appear automatically.
Click the extension icon to toggle the widget's visibility.
