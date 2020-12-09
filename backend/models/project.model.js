const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Building the projects mongoose schema with the paramets included below then exporting the Project model to be used by the rest of the application.
const projectSchema = new Schema(
  {
    username: { type: String, required: true },
    status: { type: String, required: true },
    projectName: { type: String, required: true },
    submissionDate: { type: Date, required: true },
    attachments: { type: Array },
    karmaPoints: { type: Number },
    communicationPoints: { type: Number },
    projectPoints: { type: Number },
    isGraded: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
