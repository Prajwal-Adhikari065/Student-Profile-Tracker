# 🎓 Student Profile Tracker

A full-stack web application for creating and viewing student profiles along with their favorite programming languages.

The application features a responsive frontend built with **HTML, CSS, and Vanilla JavaScript**, connected to a **Node.js + Express.js backend** and a **PostgreSQL database**.

---

## 🚀 Tech Stack

### Frontend

* **HTML5**
* **CSS3**
* **Vanilla JavaScript**
* **Fetch API**

### Backend

* **Node.js**
* **Express.js**

### Database

* **PostgreSQL**
* **pg (node-postgres)**

### Security & Configuration

* **dotenv** — Environment variable management
* **CORS** — Cross-Origin Resource Sharing

---

## ✨ Features

* 👤 **Create Student Profiles**

  * Add username
  * Add age
  * Add favorite programming language

* 📋 **View Student Profiles**

  * Fetch student records from PostgreSQL
  * Display data dynamically in a structured table

* 🔄 **REST API**

  * `POST /profile` for creating profiles
  * `GET /profile` for retrieving profiles

* 🗄️ **Automatic Database Table Creation**

  * Checks whether the required table exists
  * Creates the table automatically when the application starts

* 🔐 **Environment Variable Protection**

  * Database credentials are stored inside `.env`
  * `.env` is excluded from Git using `.gitignore`

* 📱 **Responsive Frontend**

  * Works across desktop and mobile screen sizes

---

## 📂 Project Structure

```text
Student-Profile-Tracker/
│
├── db/
│   └── db.js              # PostgreSQL connection and query execution
│
├── src/
│   └── app.js             # Express configuration and API routes
│
├── .env                   # Database credentials (not committed)
├── .gitignore             # Files excluded from Git
├── index.html             # Main frontend interface
├── script.js              # Client-side JavaScript and API requests
├── style.css              # Custom CSS styling
├── server.js              # Server entry point
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

---

# 🛠️ Getting Started

Follow the steps below to run the project locally.

## 📋 Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) **v18 or higher**
* [PostgreSQL](https://www.postgresql.org/)
* Git

You can verify Node.js and npm with:

```bash
node --version
npm --version
```

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Prajwal-Adhikari065/Student-Profile-Tracker.git
```

Navigate into the project directory:

```bash
cd Student-Profile-Tracker
```

---

### 2. Install Dependencies

Install all required Node.js packages:

```bash
npm install
```

---

## 🔐 3. Configure Environment Variables

Create a `.env` file in the root directory of the project:

```text
.env
```

Add your PostgreSQL configuration:

```env
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PORT=5432
DB_PASSWORD=your_postgres_password
DB_NAME=Students
```

> ⚠️ **Important:** Never upload your `.env` file to GitHub because it contains sensitive database credentials.

Make sure your `.gitignore` contains:

```gitignore
.env
node_modules/
```

---

## 🗄️ 4. Create the Database

Make sure PostgreSQL is running.

Then create the database:

```sql
CREATE DATABASE "Students";
```

You can execute this command using **psql**, **pgAdmin**, or another PostgreSQL client.

---

## ▶️ 5. Start the Application

Run the application using:

```bash
npm start
```

If your project uses a development script, you can also run:

```bash
npm run dev
```

Once the server starts, it should be available at your configured localhost port.

For example:

```text
http://localhost:3000
```

---

## 🌐 6. Open the Frontend

Open the application in your browser.

If the frontend is served separately, you can open:

```text
index.html
```

or use a local development server such as **VS Code Live Server**.

---

# 🔗 API Endpoints

| Method | Endpoint   | Description                           |
| ------ | ---------- | ------------------------------------- |
| `POST` | `/profile` | Create and save a new student profile |
| `GET`  | `/profile` | Retrieve all student profiles         |

---

## 📤 POST `/profile`

Creates a new student profile.

### Example Request

```json
{
  "username": "Prajwal",
  "age": 18,
  "favorite_language": "JavaScript"
}
```

### Example Response

```json
{
  "message": "Student profile created successfully"
}
```

---

## 📥 GET `/profile`

Retrieves all student profiles stored in the PostgreSQL database.

### Example Response

```json
[
  {
    "id": 1,
    "username": "Prajwal",
    "age": 18,
    "favorite_language": "JavaScript"
  },
  {
    "id": 2,
    "username": "Alex",
    "age": 19,
    "favorite_language": "Python"
  }
]
```

---

# 🔄 How It Works

```text
┌──────────────────────┐
│      Frontend        │
│   HTML + CSS + JS    │
└──────────┬───────────┘
           │
           │ Fetch API
           ▼
┌──────────────────────┐
│      Express.js      │
│      REST API        │
└──────────┬───────────┘
           │
           │ pg
           ▼
┌──────────────────────┐
│     PostgreSQL       │
│      Database        │
└──────────────────────┘
```

### Data Flow

1. User enters student information in the frontend form.
2. JavaScript sends the data to the backend using `fetch()`.
3. Express receives the request through the `/profile` API.
4. The backend executes a PostgreSQL query.
5. PostgreSQL stores the student profile.
6. The frontend can request `/profile` to retrieve the stored records.
7. JavaScript dynamically displays the records in the table.

---

# 🔒 Security

This project uses environment variables to keep database credentials outside the source code.

### Protected `.env`

```env
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PORT=5432
DB_PASSWORD=your_postgres_password
DB_NAME=Students
```

### `.gitignore`

```gitignore
.env
node_modules/
```

This prevents sensitive credentials and installed dependencies from being committed to the Git repository.

> 💡 For production applications, additional security measures such as authentication, authorization, input validation, rate limiting, HTTPS, and secure database configuration should also be implemented.

---

# 🧪 Future Improvements

Possible improvements for future versions:

* [ ] Add student profile deletion
* [ ] Add profile editing/updating
* [ ] Add search functionality
* [ ] Add sorting and filtering
* [ ] Add form validation
* [ ] Add authentication and authorization
* [ ] Add password hashing if user accounts are introduced
* [ ] Add pagination
* [ ] Improve error handling
* [ ] Add loading states
* [ ] Deploy the backend and database
* [ ] Deploy the frontend
* [ ] Add automated testing

---

# 📸 Screenshots

<img width="1910" height="965" alt="image" src="https://github.com/user-attachments/assets/f7fd28fd-a1f4-4f42-bfc7-a54f871985c5" />



# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Make your changes
4. Commit your changes

```bash
git add .
git commit -m "Add new feature"
```

5. Push the branch

```bash
git push origin feature/new-feature
```

6. Open a Pull Request

---

# 📄 License

This project is open-source and available under the **ISC License**.

---

# 👨‍💻 Author

**Prajwal Adhikari**

GitHub:
https://github.com/Prajwal-Adhikari065

---

⭐ If you found this project useful, consider giving the repository a **star** on GitHub!
