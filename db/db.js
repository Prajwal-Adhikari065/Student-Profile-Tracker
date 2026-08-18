const { Client } = require("pg");


require("dotenv").config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.error("Database connection error:", err));

async function saveStudentData(data) {
  const { username, age, fav_language } = data;

  const query = `
        CREATE TABLE IF NOT EXISTS students_hobby(
            username VARCHAR(50) PRIMARY KEY,
            age INT,
            fav_language VARCHAR(15),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

  const result = await client.query(query);
  console.log("Saving student data in database.....");
  const insertQuery = `
        INSERT INTO students_hobby (username, age, fav_language)
        VALUES ($1, $2, $3);
    `;

  const values = [username, age, fav_language];
  await client.query(insertQuery, values);
  console.log("Students hobbies uploaded to database successfully.");
}

async function getStudentData() {
  console.log("Fetching Data from Backend....");

  const result = await client.query("SELECT * FROM students_hobby");

  console.log("Data:", result.rows);

  return result.rows;
}

module.exports = {
  saveStudentData,
  getStudentData,
};
