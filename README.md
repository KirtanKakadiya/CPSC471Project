# Univeristy Room Booking App (UniLodge)

# Overview of the Application
As a current university student finding quiet workspaces is quite difficult to find as many rooms get booked very quickly due to the large number of students at the university and only some rooms being available. The problem that we want to address is to create a web application where students will be able to access various types of rooms such as study rooms, lecture halls, and other workspaces that aren't being used. The solution that we have is to create an app similar to a standard web booking room however, offering access to more rooms such as lecture halls which can be used as a quiet study space for multiple students or regular study rooms. 
# Installation Guide

**Steps to Start Application**

1. Open a terminal window
2. Navigate to the client folder (```cd client```)
3. Run ```npm install``` in the terminal
4. Open a seperate terminal window
5. Navigate to the server folder (```cd server```)
6. Run ```npm install``` in the terminal
7. In the server folder create a ```.env``` file
8. Add these variables to the `.env` file:
   - `DB_HOST=localhost`
   - `DB_USER=USER`
   - `DB_PASSWORD=PASSWORD`
     - `DB_HOST`: The hostname of your database server.
     - `DB_USER`: Your database username.
     - `DB_PASSWORD`: Your database password.
9. In the client terminal run a ```npm start```
10. In the server terminal run a ```node node.js```
