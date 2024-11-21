System Overview
The Disaster Reporting System is a web-based application designed to help manage information about disasters and their associated reports. It provides functionalities to:

Add and View Disasters: Users can add details about a disaster (e.g., type, location, and severity) and view a list of all disasters.
View Detailed Information: For each disaster, users can see its detailed information and reports submitted by different reporters.
Submit Reports: Users can submit detailed reports about a specific disaster.
Core Components
1. Backend (Node.js)
The backend is built using Node.js with the Express framework.
It handles all server-side logic, including routing, database interactions, and data validation.
2. Database (MySQL)
The system uses a MySQL database to store information about disasters and reports.
Two tables are used:
Disasters Table: Stores details of each disaster (type, location, severity, and a timestamp).
Reports Table: Stores reports related to specific disasters, including the reporter's name and their description.
3. Frontend (HTML, CSS, EJS)
The frontend is powered by EJS (Embedded JavaScript) templates, which dynamically render HTML content.
A simple CSS file is included for styling.
Features and Workflow
Homepage (/)
Displays a list of all disasters in the system.
Each disaster is shown with its type, location, and severity.
Clicking on a disaster's name takes you to its detail page.
Add Disaster (/add)
Users can navigate to this page to add a new disaster by providing:
Disaster type (e.g., Flood, Earthquake, etc.)
Location (e.g., city, town, or specific area)
Severity (Low, Medium, High)
After submission, the disaster is added to the database and displayed on the homepage.
View Disaster Details (/disaster/:id)
Displays detailed information about a specific disaster, including:
Disaster type, location, and severity.
A list of reports submitted about the disaster.
Includes a form for adding a new report for the disaster.
Submit Report
From the disaster details page, users can fill out a form to submit a report about the disaster, providing:
Their name.
A description of what they observed.
The report is linked to the disaster and stored in the Reports table.
Technical Explanation
Routes and Their Roles
Homepage Route (/):

Method: GET
Query: Fetches all disasters from the Disasters table.
View: Renders index.ejs, passing the list of disasters.
Add Disaster Page (/add):

Method: GET
View: Renders addDisaster.ejs.
Add Disaster Form Submission (/add):

Method: POST
Query: Inserts a new disaster into the Disasters table.
Redirect: Redirects to / after successful submission.
View Disaster Details (/disaster/:id):

Method: GET
Query: Fetches disaster details and associated reports using a multi-query.
View: Renders disasterDetails.ejs, passing the disaster and reports data.
Submit Report (/disaster/:id/report):

Method: POST
Query: Inserts a new report into the Reports table.
Redirect: Redirects to the same disaster details page after submission.
Database Schema
1. Disasters Table
Columns:
id: Unique identifier for each disaster.
disaster_type: Type of disaster (e.g., Flood, Earthquake).
location: Location where the disaster occurred.
severity: Disaster's severity (Low, Medium, High).
reported_at: Timestamp of when the disaster was reported.
2. Reports Table
Columns:
id: Unique identifier for each report.
disaster_id: Links the report to a specific disaster.
reporter_name: Name of the person who submitted the report.
description: Details about the disaster report.
reported_at: Timestamp of when the report was submitted.
User Interaction Flow
Step 1: Add a Disaster

Navigate to /add to input details about a disaster.
Click "Submit" to save it to the database.
Step 2: View All Disasters

Visit / to see a list of disasters.
Click on a disaster to view its details.
Step 3: View Disaster Details

On the disaster details page, view the disaster's information and reports submitted by others.
Step 4: Submit a Report

On the disaster details page, use the form to submit a report about the disaster.
