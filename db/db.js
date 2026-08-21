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
  .then(async() =>{
    console.log("Database Connected Successfully");
     await createTableIfNotExists();
  } )
  
  .catch((err) => console.error("Database connection error:", err));


  async function createTableIfNotExists() {
  const query = `
    CREATE TABLE IF NOT EXISTS students_hobby(
      username VARCHAR(50) PRIMARY KEY,
      age INT,
      fav_language VARCHAR(15),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await client.query(query);
  console.log("Table initialized");
 
}

async function saveStudentData(data) {
const { username, age, fav_language } = data;
  
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


  return result.rows;
}

async function deleteStudentData(username) {
  console.log(`Deleting student ${username} from database...`);
  const query = `DELETE FROM students_hobby WHERE username = $1;`;
  await client.query(query, [username]);
  console.log("Data deleted successfully");
}

async function updateStudentData(username, data) {
  const { age, fav_language } = data;
  console.log(`Updating student ${username} in database...`);
  
  const query = `
    UPDATE students_hobby 
    SET age = $1, fav_language = $2 
    WHERE username = $3;
  `;
  
  await client.query(query, [age, fav_language, username]);
}

module.exports = {
  saveStudentData,
  getStudentData,
  deleteStudentData,
  updateStudentData,
};



