const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("This is the home page");
});
app.post("/login",(req,res)=>{
    res.status(200).json({"messge":"Login successful"});
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});