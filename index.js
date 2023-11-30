const express=require("express")
const connection=require("./configs/db")

require("dotenv").config()
const cors=require("cors")

const  projectRouter= require("./route/project.Route")
const projectfileRouter=require("./route/projectfile.Route")

const app=express()
app.use(express.json())
const port=process.env.port

app.use(cors())
app.get("/",(req,res)=>{
    res.send("Welcome to homepage of Zura Backend")
})


app.use("/projectfile",projectfileRouter)
app.use("/project",projectRouter)
app.listen(port,async()=>{
    try {
        await connection
        console.log("Connnection succesfully to db")
    } catch (error) {
      console.log(error)  
    }
    console.log("Port Running at 8080")
})