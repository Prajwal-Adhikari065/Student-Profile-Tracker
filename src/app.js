const express = require("express");
const cors = require("cors");
const { saveStudentData, getStudentData , deleteStudentData,updateStudentData} = require("../db/db");

const app = express();
app.use(express.json());
app.use(cors());



app.post("/profile", async (req, res) => {
  const profileInformation = req.body;
  console.log("Form data received.");

  try {
    await saveStudentData(req.body);

    res.status(201).json({
      message: "Profile information acquired at backend..",
      data: req.body,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Server error");
  }
});

app.get("/profile", async (req, res) => {
  try {
    const students = await getStudentData();

    res.status(200).json(students);
    console.log("Data sent to Frontend successfully");
  } catch (error) {
    console.error("Error fetching data:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});



app.delete("/profile/:username", async (req, res) => {
  const { username } = req.params;

  try {
    await deleteStudentData(username);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

app.put("/profile/:username", async (req, res) => {
  const { username } = req.params;
  const { age, fav_language } = req.body;

  try {
    await updateStudentData(username, { age, fav_language });
    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Failed to update student" });
  }
});
module.exports = app;
