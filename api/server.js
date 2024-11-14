const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')

server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionRouter);



server.get('/', (req, res) => {
    res.send(`<h1>Lets build this project</h1>`)
})
module.exports = server;


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!