const express=require("express")
const connection=require("./configs/db")

require("dotenv").config()
const cors=require("cors")

const {projectfileRouter} =require('./route/projectfile.Route');
const {projectRouter}=require('./route/project.Route')

const app=express()
app.use(express.json())
const port=process.env.port|| 8080

app.use(cors())
app.get("/",(req,res)=>{
    res.send("Welcome to homepage of Zura venture Backend")
})


app.use("/projectfile",projectfileRouter)
app.use("/project",projectRouter)
app.listen(port,async()=>{
    console.log("connecting to db");
    try {
        await connection
        console.log("Connnection succesfully to db")
    } catch (error) {
      console.log(error)  
    }
    
})