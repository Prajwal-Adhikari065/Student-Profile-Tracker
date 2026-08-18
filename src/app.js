const express = require("express");
const cors = require("cors");
const {   saveStudentData, getStudentData} = require("../db/db");


const app = express();
app.use(express.json());
app.use(cors());

app.post("/profile",async (req,res)=>{
    const profileInformation = req.body;
    console.log("Form data received.");
    
    try{
        await saveStudentData(req.body);


    res.status(201).json({
        message : "Profile information acquired at backend..",
        data: req.body
    })
    }
    catch (error){
      console.error("Error saving data:", error);
        res.status(500).send("Server error");
    }
    
})

   app.get("/profile", async (req, res) => {
    try {
        const students = await getStudentData();

        console.log("Students:", students);

        res.status(200).json(students);

    } catch (error) {
        console.error("Error fetching data:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = app;