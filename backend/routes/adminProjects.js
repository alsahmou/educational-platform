const router = require('express').Router()
const AdminProject = require('../models/adminProjects.model')

router.route('/').get((req, res) => {
  AdminProject.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
  AdminProject.find({ username: req.params.id })
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const username = req.body.username
  const projectName = req.body.projectName
  const projectPicture = req.body.projectPicture
  const participantsNumber = Number(req.body.participantsNumber)
  const users = req.body.users
  const description = req.body.description
  const projectPoints = Number(req.body.projectPoints)
  const dueDate = String(req.body.dueDate)
  const isGroup = Boolean(req.body.isGroup)
  const groupSize = Number(req.body.groupSize)

  const newAdminProject = new AdminProject({
    username,
    projectName,
    projectPicture,
    participantsNumber,
    users,
    description,
    projectPoints,
    dueDate,
    isGroup,
    groupSize
  })

  newAdminProject.save()
    .then(() => res.json('Project added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/adduser/:id').post((req, res) => {
  AdminProject.findById(req.params.id)
    .then(projects => {
      projects.users = projects.users.concat(req.body.username);
      projects.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}); 

module.exports = router
