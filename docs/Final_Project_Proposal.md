# CSE 341 Final Project Proposal

## Contributors

- Jacob Nelson
- Nathan Reeve
- Vern Wolfley

# Tools Collection Project

## Contents

Produce a table of contents for your proposal

# Application Info

## What will the API do?

The purpose of this application is to help users track the tools they own, making it easier to manage lost, stolen, or borrowed tools. The system will allow users to create an account, add their tools to a personal inventory, and categorize them into tool sets. If a tool or tool set is not already in the database, users can contribute new entries.

Key features will include tracking tool ownership, status updates (owned, borrowed, lost, or stolen), and a lending system to monitor who has borrowed tools and when they are due back. Users will also be able to upload photos, attach documentation, and generate reports. Additionally, the app will support search and filtering, tool set management, and notifications for missing or overdue tools.

This system aims to provide an organized, efficient way to keep track of tools, reducing losses and improving accountability.

## How will your API utilize a login system?

The API will implement a login system to authenticate users before granting access to protected resources or allowing CRUD operations. This will ensure that only authorized users can manage their tools, report missing items, and contribute to tool sets.

## What database will you use?

For this project, we have chosen MongoDB as the database due to its flexibility, scalability, and ease of handling unstructured or semi-structured data.

## How will the data be stored in your database?

The data will be stored in MongoDB as collections of documents. Each collection will represent a key entity in the application, ensuring an organized and efficient structure. See attached proposed database structures for each collection.

## How would a frontend be able to manage authentication state based on the data you provide?

To manage authentication state, the frontend will provide users with an interface to log in using their username and password. Upon successful authentication, a token will be issued and stored in local storage. The frontend will use this token to manage authentication state, ensuring users remain logged in while their session is valid. 

## What pieces of data in your app will need to be secured?

The application will handle user data, including:
- Personal information (name, email, authentication credentials)
- Tool ownership records (personal tool list, tool set details)
- User-generated data (tools marked as lost, stolen, or borrowed)
  
Since this data is personal and sensitive, it should be protected from unauthorized access, leaks, and manipulation.

## How will you demonstrate web security principles in the development of this app?

By utilizing these following principles, the app will ensure data integrity, user privacy, and protection against common security threats.
- Implement OAuth 2.0 for secure user authentication, ensuring only authorized users access their tool data.
- Hash passwords with bcrypt before storing them in the database.
- Use HTTPS (TLS/SSL) to encrypt data in transit.
- Use JWT (JSON Web Tokens) or OAuth tokens for session management.

## What file structure and program architecture will you use for this project (how will you organize your node project)? Why?
For this project, we will use a MVC (Model-View-Controller) architecture to keep concerns separated and the codebase modular. The file structure will be organized as follows:

```
  ├── node_modules
  ├── src
  │   ├── auth
  │   ├── controllers
  │   │   ├── **/*.css
  │   ├── data
  │   ├── database
  │   ├── models
  │   ├── public
  │   ├── routes
  │   ├── utilities
  ├── .env
  ├── .gitignore
  ├── app.js
  ├── package.json
  ├── package-lock.json
  ├── swagger.js
  └── swagger.json
```

It is best practice to structure a Node.js project by organizing files according to their purpose and placing them in appropriate directories.
- src: This folder contains all the files required to handle server like routes, controllers, models, views, etc.
- auth:  This folder contains files related to user authentication and authorization.
- controllers: This folder contains the business logic and validations for the input data received by the client side and performs their business logic.
- data:
- database:  This folder contains files related to database configuration and connection.
- models: This folder contains all the schemas of the database, like which kind of input will be received from client-side and server-side validations.
- public: This folder contains static files that are visible to people, like index.html, script.js, and images.
- routes: This folder contains all the routes and endpoints required for the server.
- utilities: This folder contains helper functions or reusable code that doesn't fit into a specific feature or module but is used across the project.
- .env:  This file contains details about environment variables that should be kept private.
- package.json: This file contains the data and details of all dependencies installed in the project.
- app.js: This is the entry point file of the server, which contains the main routes of the application and server ports from which the server will start listening, as well as the basic routes used in this application.


<!-- https://medium.com/@jayjethava101/node-js-project-structure-best-practices-and-example-for-clean-code-3e1f5530fd3b -->
<!-- https://medium.com/@akshatgadodia/a-comprehensive-guide-to-structuring-node-js-projects-best-practices-and-example-44eb493920ca -->
<!-- https://reintech.io/blog/structuring-a-nodejs-project-a-comprehensive-guide-for-software-developers -->

## What are potential stretch challenges that you could implement to go above and beyond?

As a team we were looking into potentially both utilizing Typescript and looking into GraphQL API

# API Endpoint Planning

## For this section, you’ll plan out what API endpoints you’ll need for your project.

- Users
  - GET/users/
  - POST/users/
  - GET/users/{username}
  - PUT/users/{username}
  - DELETE/users/{username}

- UserTools
  - GET/userTools/
  - POST/userTools/
  - GET/userTools/{username}
  - PUT/userTools/{username}
  - DELETE/userTools/{username}

- Tools
  - GET/tools/
  - POST/tools/
  - GET/tools/{id}
  - PUT/tools/{id}
  - DELETE/tools/{id}

- ToolSets
  - GET/toolSets/
  - POST/toolSets/
  - GET/toolSets/{id}
  - PUT/toolSets/{id}
  - DELETE/toolSets/{id}

# Project Scheduling and Delegation

## Plan out what tasks will get completed with each lesson remaining in the semester.

| Lesson    | Tasks                          |
| --------- | ------------------------------ |
| Lesson 9  | Project Proposal               |
| Lesson 10 | •	Add, Update, and test routes |
|           | • Add and or update swagger documentation |
|          |  •	Publish to Render.com |
|          |  •	Create video documentation of progress     |
| Lesson 11 | •	Continued testing of API routes |
|            |•	Continued testing of business logic |
|          | •	Begin developing unit testing using Jest |
| Lesson 12 |  •	Continued testing of API routes |
|          |•	Continued testing of business logic |
||•	Continued development of unit testing using Jest |
||•	Look at possible front end development     |
| Lesson 13 |  •	Final API testing
||•	Front end development
||•	Passing all tests
||•	Publish to Render.com
||•	Double check project checklist
||•	Create video documentation of progress     |

## How will you divide up work in your team to ensure the following tasks all get completed?

As a team, we plan to create a detailed list of all tasks using GitHub Issues. This will allow us to track progress, assign tasks to team members, and ensure accountability throughout the project.

# Potential Risks and Risk Mitigation Techniques

## What are the risks involved with you being able to finish this project in a timely manner?

If individual tasks take longer than expected, they can delay dependent tasks, causing setbacks in the overall timeline. Additionally, conflicting schedules or other commitments among team members may slow progress, making it harder to stay on track. Miscommunication about responsibilities can lead to duplicate efforts or overlooked tasks, further complicating workflow. Unforeseen technical challenges, such as integration issues or debugging complexities, may also arise, requiring additional time to resolve and potentially impacting the project's completion.

## How will you mitigate or overcome these risks?

To help mitigate these and any other unforeseen risks we could utilizes these strategies.
•	Use a project management tool (e.g., Trello, GitHub Projects) to track tasks and deadlines. 
•	Break tasks into smaller milestones to ensure steady progress and early issue detection. 
•	Implement Agile practices with regular check-ins to adjust priorities if needed. 
•	Set realistic deadlines and allocate buffer time for debugging and unexpected blockers. 
•	Maintain clear documentation to avoid miscommunication


# Appendix

## Database Structure

**User Collection:** Stores user account details, including authentication credentials, contact information, and role.

```
{
  \_id: ObjectId,
  username: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  role: {
    type: String,
    enum: \['admin', 'user'\],
    default: 'user'
  }
}
```

**User Tools Collection:** Stores user specific tools and their status.

```
{
  \_id: ObjectId,
  user_id: { type: ObjectId, ref: "User" },
  tool_id: { type: ObjectId, ref: "Tool" },
  set_id: { type: ObjectId, ref: "ToolSet" },
  serial_number: String,
  condition: {
    type: String,
    enum: \["New", "Good", "Fair", "Poor", "Used", "Like New"\],
    default: "Used",
    },
  status: {
    type: String,
    enum: \['Owned', 'Borrowed', 'In Repair', 'Lost', 'Stolen', 'Sold', 'Discarded'\],
    default: 'Owned'
    },
  purchase_price: Number,
  purchase_date: Date,
  location: String,
  notes: String,
  loanedTo: String,
  last_updated: { type: Date, default: Date.now }
}
```

**Tools Collection:** Contains details of individual tools, including brand, model, and other identifiers.

```
{
  \_id: ObjectId
  tool: String,
  brand: String,
  model_number: String,
  category: String,
  size: String,
  set_id: ObjectId,
  power_source: { type: String, enum: \["battery", "corded", "manual"\] },
  specifications: \[
    {
    name: { type: String, enum: SPECIFICATION_TYPES },
    value: String,
    },
  \],
  description: String,
  image_url: String,
}
```

**Tool Sets Collection:** Represents groups of tools that users own the individual tools are contained in the tools collection.

```
{
  \_id: ObjectId
  tool: String,
  brand: String,
  category: {
  type: String,
    enum: \["Hand Tools", "Power Tools", "Mechanic Tools", "Woodworking", "Plumbing", "Other"\],
    },
  image_url: String,
  description: String,
  tools: \[{ type: Schema.Types.ObjectId, ref: "Tool" }\],
}
```
