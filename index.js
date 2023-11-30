const express=require("express")
const connection=require("./configs/db")
const app=express()
require("dotenv").config()
const cors=require("cors")

app.use(cors())
app.use(express.json())
const {projectfileRouter}=require("./route/projectfile.Route")
const  {projectRouter}= require("./route/project.Route")


const port=process.env.port|| 8080


app.get("/",(req,res)=>{
    res.send("Welcome to homepage of Lama Backend")
})

app.use("/project",projectRouter)
app.use("/projectfile",projectfileRouter)

app.listen(port,async()=>{
    try {
        await connection
        console.log("Connnection succesfully to db")
    } catch (error) {
      console.log(error)  
    }
    console.log("Port Running at 8080")
})