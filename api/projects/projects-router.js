// Write your "projects" router here!
const express = require('express')

const Project = require('./projects-model')
const Actions = require('../actions/actions-model')

const router = express.Router()


router.get('/', async(req,res) => {
const projects = await Project.get()
if(!projects || projects.length === 0){
res.send([])
}else{
    res.json(projects)
}
})

router.get('/:id', (req,res) => {
    
})

router.post('/:id', (req,res) => {
    
})

router.put('/', (req,res) => {
    
})

router.delete('/:id', (req,res) => {
    
})

router.get('/:id/actions', (req,res) => {
    
})


module.exports = router