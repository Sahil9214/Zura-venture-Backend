const express = require("express");
const  ProjectFileModel =require("../model/projectFile.model")
const projectfileRouter = express.Router();


projectfileRouter.get("/", async (req, res) => {
  const query={};
  try {
    const projects=await ProjectFileModel.find(query);
    res.send(projects);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong..Check Again" });
  }
});

projectfileRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const newProject = new ProjectFileModel(payload);
    await newProject.save();
    res.send("Project created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong..Check Again" });
  }
});

projectfileRouter.get("/:id", async (req, res) => {
  try {
    const {id} =req.params;
    const projects = await ProjectFileModel.findById(id);
    if (!projects) {
      res.status(404).send({ message:"Projects not found"});
    } else {
      res.send({projects});
    }
  } catch(error) {
    console.log(error.message);
    res.status(500).send({message:"Something went wrong"});
  }
});

projectfileRouter.patch("/update/:id", async (req, res) => {
  const {id}=req.params;
  const payload=req.body;
  try {
    const project=await ProjectFileModel.findById(id);
    const projectID_in_post=project.userID;
    const projectID_in_req =req.body.userID;
    if (projectID_in_post!==projectID_in_req) {
      res.status(401).send({ message:"You are not authorized to proceed projectID" });
    } else {
      await ProjectFileModel.findByIdAndUpdate(id, payload);
      res.send("Project Updated Successfully");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message:"Something went wrong" });
  }
});

projectfileRouter.delete("/delete/:id",async (req, res) => {
  const {id} = req.params;
  try {
    const project = await ProjectFileModel.findById(id);
    const projectID_in_post =project.userID;
    const projectID_in_req =req.body.userID;
    if (projectID_in_post!==projectID_in_req) {
      res.status(401).send({ message: "You are not authorized to proceed.Try Again" });
    } else {
      await ProjectFileModel.findByIdAndDelete(id);
      res.send("Deleted post successfully");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
});




module.exports =projectfileRouter