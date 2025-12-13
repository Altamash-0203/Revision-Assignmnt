require("dotenv").config()

const app=require("./app")
const db=require("./db/db")

db()

let PORT=process.env.PORT

app.listen(PORT,()=>console.log("server started"))
