import express from "express";
import cors from "cors";
import mongoose  from "mongoose";
import dotenv from "dotenv";

const port = 4000;
const app = express();

app.get("/", (req, res) => {
    res.send('success with port ' + port)
});


app.listen(port, () => {
    console.log("working");
});