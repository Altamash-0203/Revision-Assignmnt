const express=require("express")
const app=express()

app.use(express.json())

app.use(require("./middlewere/auth"))


app.use("/characters",require("./Routes/charcterRoute"))
app.use("/analytics",require("./Routes/analytics"))

module.exports=app