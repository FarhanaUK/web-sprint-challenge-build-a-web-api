// Write your "project" router here!
const express = require('express')

const Project = require('./projects-model')
const Actions = require('../actions/actions-model')
const {validateProjectData, errorHandler, validateById,} = require('./projects-middleware')

const router = express.Router()


router.get('/', async(req,res) => {
const project = await Project.get()
if(!project || project.length === 0){
res.send([])
}else{
    res.json(project)
}
})

router.get('/:id', validateById,(req,res) => {
 res.json(req.body)
})

router.post('/:id', (req, res, next) => {
    Project.insert({name: req.body.name})
    .then(newProject => {
     res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/', (req,res) => {
    
})

router.delete('/:id', (req,res) => {
    
})

router.get('/:id/actions', (req,res) => {
    
})


module.exports = router