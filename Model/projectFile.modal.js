const mongoose = require("mongoose");

const projectFileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectFileModel = mongoose.model("ProjectFile", projectFileSchema);

module.exports={ProjectFileModel}