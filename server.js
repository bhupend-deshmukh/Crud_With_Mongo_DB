const express = require("express");
const Router = require("./Routes/crud.router");
require("dotenv").config();
const app = express();

app.use(express.json())
app.use(Router)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Your server is listening on http://localhost:${PORT}`);
})