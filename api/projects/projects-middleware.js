// add middlewares here related to projects
const Project = require('./projects-model')

function validateProjectData(req, res, next) {
  const { name, description, completed } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      message:
        "Missing required fields: 'name' and 'description' are required.",
    });
  }
  if (completed === undefined) {
    req.body.completed = false;
  }
  next();
}

async function validateById(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      return next({ status: 404, message: "project not found" });
    } else {
      req.body = project
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding project",
    });
  }
}

function errorHandler(err, req, res, next) {
    
    res.status(err.status || 500).json({
      customMessage: "Something went wrong while processing your request.",
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack // Hide stack trace in production
    });
  }

module.exports= {validateProjectData, errorHandler, validateById}