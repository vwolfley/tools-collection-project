CSE 341 Final Project Proposal

# General Info

Jacob Nelson
Nathan Reeve
Vern Wolfley

Tools Collection Project

Contents

\[Produce a table of contents for your proposal\]

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

## What pieces of data in your app will need to be secured? How will you demonstrate web security principles in the development of this app?

## What file structure and program architecture will you use for this project (how will you organize your node project)? Why?
```
├── src
│   ├── auth
│   ├── controllers
│   │   ├── **/*.css
│   ├── views
│   ├── model
│   ├── index.js
├── public
│   ├── css
│   │   ├── **/*.css
│   ├── images
│   ├── js
│   ├── index.html
├── dist (or build
├── node_modules
├── package.json
├── package-lock.json
└── .gitignore
```
What are potential stretch challenges that you could implement to go above and beyond?

For this section, you’ll plan out what API endpoints you’ll need for your project.

# Project Scheduling and Delegation

Plan out what tasks will get completed with each lesson remaining in the semester.

| Lesson    | Tasks |
| --------- | ----- |
| Lesson 9  |       |
| Lesson 10 |       |
| Lesson 11 |       |
| Lesson 12 |       |
| Lesson 13 |       |

## How will you divide up work in your team to ensure the following tasks all get completed?

# Potential Risks and Risk Mitigation Techniques

## What are the risks involved with you being able to finish this project in a timely manner?

## How will you mitigate or overcome these risks?

# Database Structure

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
