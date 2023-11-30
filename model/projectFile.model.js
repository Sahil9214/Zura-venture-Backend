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

// {
//   "fileName": "Sample File",
//   "description": "This is a sample file description.",
//   "projectId": "60ae2aeb8751e83a94b8e71c",
//   "createdAt": "2023-11-30T12:34:56.789Z",
//   "updatedAt": "2023-11-30T12:34:56.789Z"
// }
