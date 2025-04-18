Challenge 1: Job Application Tracker (MERN Stack)

A simple web application where users can:
1. View a list of companies.
2. Mark companies as Target or Not Target.
3. Status is saved per user and updates in real time.
4. Users can register, log in, and their choices are saved in a MongoDB database.

💡 Features:
1. JWT Authentication with secure httpOnly cookies.
2. Company status management (Target / Not Target).
3. MongoDB as the database.
4. React frontend for smooth UI interaction.
5. Protected routes with user-specific company data.

.env File:
1. PORT=5000
2. MONGO_DB_URI=your_mongodb_connection_string
3. JWT_SECRET=your_jwt_secret

Frontend & Backend Setup: npm install & npm run dev

-------------------------------**********************---------------------------------

Challenge 2: LinkedIn Profile Enhancer Widget (Chrome Extension)
A Chrome extension that injects a floating widget on LinkedIn profile pages.

💡 Features:
1. Displays Company Name, Match Score (with a progress bar), and Account Status (colored tag).
2. UI injected via content.js.
3. Uses chrome.storage.sync to save toggle state (show/hide widget).
4. Responsive design for ~300px width.
5. Uses static sample JSON data.

Sample data:
{
  "companyName": "TechCorp",
  "matchScore": 86,
  "accountStatus": "Target"
}

How to Install:
1. Open Chrome and go to chrome://extensions/.
2. Enable Developer Mode (top-right).
3. Click Load Unpacked and select the challenge-2-linkedin-widget folder.
4. Visit a LinkedIn profile page — the widget will appear automatically.
5. Click the extension icon to toggle the widget's visibility.
