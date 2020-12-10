# Educational Platform Website

This website allows tutors to assign their students projects and assigments to complete while tracking their progress and submissions. Users are able to check all of their projects and assignments and their info, check the leaderboards and enroll in new optional projects.

# Setup

- Install ReactJS and Node.js on your local machine by following these steps https://medium.com/@DanielSayidi/
  install-and-setup-react-app-on-ubuntu-18-04-3-lts-fcd2c875885a.
- Initialize a mongodb data base by following the next steps:
  - Create a mongodb Atlas account at https://www.mongodb.com/cloud/atlas.
  - Create a new project inside your by clicking on 'New Project'
  - Create a new cluster inside the project by clicking on 'Build a Cluster'
  - Choose the free tier options and the region closest to yours then click on 'Create Cluster'
  - Whitelist your IP adress by clicking on 'Add Your Current IP Address'
  - Create a new mongodb user and store the username and password in a secure location
  - Connect to the cluster using 'Connect Your Application', ensure that the driver is node.js and copy the connection string
- Create a .env file in the same directory as server.js file with the following parameters and use the connection string you copied from mongodb as the value for ATLAS_URI and choose suitable values for the session parameters

```
ATLAS_URI = ######
SESSION_LENGTH = ######
STORAGE_DIRECTORY = ./storage
SESSION_SECRET = ######
```

### Run Website

- Use the command `npm start` to run the React App
- Use the command `nodemon server` to run the backend and connect to mongodb Atlas
