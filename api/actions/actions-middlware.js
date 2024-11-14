// add middlewares here related to actions
const Actions = require('./actions-model')


function validateActionData(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
  
    if (!project_id || !description || !notes) {
      return res.status(400).json({
        message:
          "Missing required fields: 'Project ID' and 'description' and 'Notes' are required.",
      });
    }
    if(description.length > 128) {
        return res.status(400).json({
             message: "'description' must be 128 characters or less."
        })
    }
    if (completed === undefined) {
      req.body.completed = false;
    }
    next();
  }
  
  async function validateById(req, res, next) {
    try {
      const action = await Actions.get(req.params.id);
      if (!action) {
        return next({ status: 404, message: "action not found" });
      } else {
        req.action = action
        next();
      }
    } catch (err) {
      res.status(500).json({
        message: "problem finding action",
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
  
  module.exports= {validateActionData, errorHandler, validateById}