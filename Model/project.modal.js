const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectsModel = mongoose.model("Project", projectsSchema);

module.exports={ProjectsModel}