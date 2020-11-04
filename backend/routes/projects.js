const router = require('express').Router()
const Project = require('../models/project.model')

// Returns all projects associated with a specific username
router.route('/getinfo').get((req, res) => {
  Project.find({ username: req.session.username })
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Add project function, the project object is created using the following parameters that are passed through the request body
router.route('/add').post((req, res) => {
  const username = req.body.username
  const status = req.body.status
  const projectName = req.body.projectName
  const submissionDate = Date.parse(req.body.submissionDate)
  const attachments = req.body.attachments
  const karmaPoints = Number(req.body.karmaPoints)
  const communicationPoints = Number(req.body.communicationPoints)
  const projectPoints = Number(req.body.projectPoints)
  const isGraded = req.body.isGraded

  const newProject = new Project({
    username,
    status,
    projectName,
    submissionDate,
    attachments,
    karmaPoints,
    communicationPoints,
    projectPoints,
    isGraded
  })

  newProject.save()
    .then(() => res.json('Project added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
