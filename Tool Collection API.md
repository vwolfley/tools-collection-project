# Tool Collection API

Collections:

- Tools – The main collection for storing tool data.
- Categories – Grouping tools (e.g., Power Tools, Hand Tools, Measuring Tools).
- Brands – Information on manufacturers (e.g., DeWalt, Milwaukee, Makita).
- Users – If users can track their own tools, you might need a user system.
- Images – Storing or linking to photos for tool identification.
- Tags – Keywords for better search functionality.
- Locations – If tools are stored in different locations (e.g., "Garage," "Truck").

Data Points for Each Tool:

- Name (e.g., Cordless Drill)
- Brand
- Model Number
- Category
- Power Source (Battery, Corded, Manual)
- Specifications (Voltage, RPM, Blade Size, etc.)
- Serial Number (for tracking)
- Condition (New, Used, Needs Repair)
- Purchase Date & Price
- Owner/User (if multiple people track tools)
- Notes (Custom descriptions or maintenance records)

## User
-  This stores the users account info.
{
"\_id": "from MongoDB_ID",
"username": "String UNIQUE",
"password": "String hashed",
"firstName": "String",
"lastName": "String",
"email": "String",
"phoneNumber": "String"
}

Example: 
{
"\_id": "from MongoDB_ID",
"username": "Toolman66",
"password": "T00lPa$$word",
"firstName": "Vern",
"lastName": "Wolfley",
"email": "vwtools@tools.com",
"phoneNumber": "555-555-5555"
}

## User Tools Collection
- This stores a user’s ownership details, linking to the tool’s general info via tool_id.
{
"\_id": "from MongoDB_ID",
"user_id": "String",
"tool_id": "String",
"set_id": "String",
"serial_number": "String",
"condition": "String",
"purchase_date": "Date",
"price": "Number,
"location": "String",
"notes": "String",
"loanedTo": "String",
}

Example:
{
"\_id": "67890",
"user_id": "user_001",
"tool_id": "12345",
"set_id": "set_001",
"serial_number": "SN12345678",
"condition": "Used",
"purchase_date": "2023-06-15",
"price": 120.00,
"location": "Garage",
"notes": "Replaced battery in Jan 2024",
"loanedTo": "John Green",
}

## Tools Collection
- This stores general data about tools, independent of any specific user.
{
"\_id": "from MongoDB_ID",
"name": "String",
"brand": "String",
"model_number": "String",
"category": "String",
"size": "String",
"set_id": "String",
"power_source": "String",
"specifications": {
"voltage": "String",
"rpm": "String",
"battery_type": "String"
},
"image_url": "String"
}

Example:
{
"\_id": "12345",
"name": "Cordless Drill",
"brand": "DeWalt",
"model_number": "DCD777C2",
"category": "Power Tool",
"size": "None",
"set_id": "None",
"power_source": "Battery",
"specifications": {
"voltage": "20V",
"rpm": "1500",
"battery_type": "Lithium-ion"
},
"image_url": "https://example.com/drill.jpg"
}



## Tools Set Collection
- This collection represents a set of tools with a reference to the individual tools inside it.
- The tools array stores references to individual tools in the set.
- Each tool in the set is stored like a regular tool in the Tools Collection.
- The set_id links the tool to a tool set.

Example:
{
  "id": "set_001",
  "name": "Craftsman 10-Piece Wrench Set",
  "brand": "Craftsman",
  "category": "Hand Tool Set",
  "image_url": "https://example.com/wrench-set.jpg",
  "tools": [
    "tool_101",
    "tool_102",
    "tool_103"
  ]
}