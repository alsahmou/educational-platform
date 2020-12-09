const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Building the adminProjects mongoose schema with the paramets included below then exporting the adminProject model to be used by the rest of the application.
const adminProjectsSchema = new Schema(
  {
    username: { type: String, required: true },
    projectName: { type: String, required: true },
    projectPicture: { type: String, required: true },
    participantsNumber: { type: Number, required: true },
    users: { type: Array },
    description: { type: String, required: true },
    projectPoints: { type: Number, required: true },
    dueDate: { type: String, required: true },
    isGroup: { type: Boolean, default: false },
    groupSize: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const adminProject = mongoose.model("adminProject", adminProjectsSchema);

module.exports = adminProject;
