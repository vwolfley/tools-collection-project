# tool-collection-project

[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?label=my-website)](https://tools-collection-project.onrender.com/)
[![GitHub license](https://img.shields.io/github/license/vwolfley/tools-collection-project?style=flat-square)](https://github.com/vwolfley/tools-collection-project/blob/main/LICENSE)

The purpose of this application is to help users track the tools they own, making it easier to manage lost, stolen, or borrowed tools. The system will allow users to create an account, add their tools to a personal inventory, and categorize them into tool sets. If a tool or tool set is not already in the database, users can contribute new entries.

Key features will include tracking tool ownership, status updates (owned, borrowed, lost, or stolen), and a lending system to monitor who has borrowed tools and when they are due back. Users will also be able to upload photos, attach documentation, and generate reports. Additionally, the app will support search and filtering, tool set management, and notifications for missing or overdue tools.

This system aims to provide an organized, efficient way to keep track of tools, reducing losses and improving accountability.

See data file for database schema

## Development Instructions

### Quickstart Instructions

1. [Clone this repo](https://github.com/vwolfley/tools-collection-project) - `https://github.com/vwolfley/tools-collection-project`
2. `cd` into the `tools-collection-project` folder.
3. Install the dependencies with `npm install`.

### Available Scripts

In the project directory, you can run:

#### `npm run dev`

- Compiles raw source code into both `debug` and `production` versions.
- Runs the application in development mode.
- Opens [http://localhost:8080](http://localhost:8080) in your browser for live preview.
- The page automatically reloads whenever you make edits.
- Displays linting errors and warnings directly in the console for easier debugging.

#### `npm run start`

- Compiles raw source code into `production` versions.
- Runs the application in production mode.
- Used to deploy on Render.com

#### `npm run swagger`

- Automatically generates the swagger.json
- Useful for testing API endpoints and ensuring up-to-date documentation.

---

## Deployment Instructions

- Push to GitHub repository
- Deploy to Render.com
- [https://tools-collection-project.onrender.com/](https://tools-collection-project.onrender.com/)

---
## Project Ideas

1. User Authentication & Roles
- Implement secure login with email/password or social authentication.
- Allow roles (e.g., Admin, Standard User) for managing tool listings.
2. Tool Status & History
- Track whether a tool is owned, borrowed, lost, or stolen.
- Log changes in tool status (e.g., borrowed from/to, last seen location).
3. Tool Set Management
- Let users group tools into sets for easier tracking.
- Allow marking a tool missing from a set (which you were already considering).
4. QR Code/Barcode Scanning
- Enable users to scan barcodes or QR codes to quickly add or identify tools.
5. Search & Filtering
- Allow searching tools by name, category, or status.
- Filter by condition, location, or tool set.
6. Tool Lending System
- Add a way to lend tools to others and track who borrowed them.
- Set due dates and reminders for returning borrowed tools.
7. Photo Uploads & Documentation
- Users can upload photos of their tools for identification.
- Attach receipts, warranties, or notes to tools.
8. Reports & Notifications
- Generate reports of tools owned, borrowed, or lost.
- Send reminders for overdue borrowed tools or missing tools in a set.


---

### ⚙ Free Web Dev Tools

- 🔗 [Google Chrome Web Browser](https://google.com/chrome/)
- 🔗 [Visual Studio Code (aka VS Code)](https://code.visualstudio.com/)
- 🔗 [Live Server VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- 🔗 [HTML Validation Service](https://validator.w3.org/)
- 🔗 [CSS Validation Service](https://jigsaw.w3.org/css-validator/)
- 🔗 [color contrast-ratio](https://www.siegemedia.com/contrast-ratio?ref=frontendchecklist)

- [Swagger Definition Objects Generator](https://roger13.github.io/SwagDefGen/)

---

### 💻 Technology

- This course is using

<a href="https://code.visualstudio.com/" title="vscode"><img src="https://github.com/get-icon/geticon/raw/master/icons/visual-studio-code.svg" alt="vscode" width="31px" height="31px"></a>
<a href="https://tc39.es/ecma262/" title="ECMAScript 6"><img src="https://github.com/get-icon/geticon/raw/master/icons/es6.svg" alt="ECMAScript 6" width="31px" height="31px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="31px" height="31px"></a>
<a href="https://www.w3.org/TR/html5/" title="HTML5"><img src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg" alt="HTML5" width="31px" height="31px"></a>
<a href="https://www.w3.org/TR/CSS/" title="CSS3"><img src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg" alt="CSS3" width="31px" height="31px"></a>
<a href="https://nodejs.org/en" title="nodejs"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="nodejs" width="31px" height="31px"></a>
<a href="https://eslint.org/" title="ESLint"><img src="https://github.com/get-icon/geticon/raw/master/icons/eslint.svg" alt="ESLint" width="31px" height="31px"></a>
<a href="https://prettier.io/" title="Prettier"><img src="https://github.com/get-icon/geticon/raw/master/icons/prettier.svg" alt="Prettier" width="31px" height="31px"></a>
<a href="https://www.markdownguide.org/" title="markdown"><img src="https://github.com/get-icon/geticon/raw/master/icons/markdown.svg" alt="markdown" width="31px" height="31px"></a>
<a href="https://git-scm.com/" title="git"><img src="https://github.com/get-icon/geticon/raw/master/icons/git-icon.svg" alt="git" width="31px" height="31px"></a>
<a href="https://github.com/" title="github"><img src="https://github.com/get-icon/geticon/raw/master/icons/github-icon.svg" alt="github" width="31px" height="31px"></a>

---


### 📚 References

---

### :warning: Licensing

This project is licensed under the MIT license.

- [LICENSE](LICENSE)

[Back to top](#tool-collection-project)


