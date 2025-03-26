# CrimeWare: Integrated Crime Data Analysis: Leveraging Knowledge Networks for Hotspot Detection and Trend Evaluation

## GraphDB + React Integration Project
This project demonstrates a process to create, update, and query RDF data using GraphDB, visualize results using a React frontend, and prepare data using tools like Protege and OntoRefine.
 
### Table of Contents
1.	Project Overview
2.	Prerequisites
3.	Tools Used
4.	Links to Resources
5.	Setting up GraphDB
6.	Data Preparation with Protege and OntoRefine
7.	Setting up the React App
8.	Connecting React with GraphDB
9.	Steps to Run the Project
10.	Troubleshooting
 
### Project Overview
This project solves key challenges in analyzing RDF-based data by:
1.	Creating ontologies and refining data using Protege and OntoRefine.
2.	Uploading RDF data (from .ttl files) into GraphDB.
3.	Running SPARQL queries to analyze and retrieve data.
4.	Building a React app to fetch, display, and visualize query results.
 
### Prerequisites
Ensure the following tools are installed:
•	GraphDB: Ontotext's RDF database.
•	Protege: Ontology editor for building ontologies.
•	OntoRefine: Data refining and transformation tool.
•	Node.js (v14+): Download Node.js.
•	npm or yarn.
•	Postman: For testing SPARQL endpoints.
•	TTL Files: RDF Turtle files.
 
### Tools Used
Tool	            ||    Purpose
GraphDB	            ||    RDF storage and SPARQL querying
Protege	            ||    Ontology design and editing
OntoRefine	        ||    Data refining and transformation for RDF
React	            ||    Frontend for visualizing query results
 
### Links to Resources (submitted on mail)
•	Project Demo Video: https://youtu.be/vsOfqYMOX8A
•	TTL Files: 
•	Integrated Crime Data Analysis: Leveraging Knowledge Networks for Hotspot Detection and Trend Evaluation  Report/Paper.
 
### Setting up GraphDB
Step 1: Install and Start GraphDB
1.	Download and install GraphDB locally.
2.	Start the server. By default, it runs on port 7200:
Step 2: Create a Repository
1.	Go to Setup > Repositories and create a new repository 

### Data Preparation with Protege and OntoRefine
Step 1: Build Ontology with Protege
1.	Use Protege to design your ontology.
2.	Save the ontology as a .ttl (Turtle) file.
3.	Verify the ontology using Protege's Reasoner.
 
Step 2: Refine and Transform Data using OntoRefine
1.	Open OntoRefine and load your source data (e.g., CSV or JSON).
2.	Refine and clean the data:
o	Add transformations to match the ontology structure.
o	Export the cleaned data as RDF/Turtle (.ttl).
3.	Verify the TTL file before uploading to GraphDB.
 
Step 3: Upload the TTL File to GraphDB
1.	In GraphDB, go to Import > RDF Upload and upload the .ttl file.
2.	Run a test query to verify:
 
### Setting up the React App
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
 
### Steps to Run the Project
1. Start GraphDB
•	Run GraphDB and ensure the repository Vedanya is available.
2. Start the React App
Run the following commands:
cd graphdb-react-app
npm start
Open your browser and visit:
http://localhost:3000
 
### Troubleshooting
•	406 Not Acceptable Error: Use the correct Accept header (application/sparql-results+json).
•	CORS Errors: Add a proxy in package.json:
json
"proxy": "http://localhost:7200"
 
### Conclusion
This project integrates GraphDB with a React frontend and includes the process of:
•	Building ontologies using Protege.
•	Cleaning data using OntoRefine.
•	Querying SPARQL endpoints and visualizing data dynamically.

### Changes made to the overall design after Deliverable 2 submission
Updated Use Case 3: Analyzing Impact of Police Presence on Crime Reduction. The original use case was on analyzing police presence using arrest data as a proxy for police interventions. However, upon further analysis, it was found that the data being represented was repetitive, leading to redundant insights.
Use latest Case 3, features a richer ontology visualized to map interrelations of Crime, Location, Time, and Police Presence. The various mappings shown in the refactored solution provide a better view of how police interventions impinge on specific places, times, and types of crimes, represented more effectively in the updated approach.


_____________________________________________________________________________________________________________________
