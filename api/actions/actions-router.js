// Write your "actions" router here!
const express = require("express");

const Actions = require('./actions-model')
const Project = require('../projects/projects-model')
const {
    validateActionData,
    errorHandler,
    validateById,
  } = require("./actions-middlware");

const router = express.Router()

router.get("/", async (req, res) => {
    const action = await Actions.get();
    if (!action || action.length === 0) {
      res.send([]);
    } else {
      res.json(action);
    }
  });
  
  router.get("/:id", validateById, (req, res) => {
    res.json(req.body);
  });
  
  router.post("/", validateActionData, async(req, res, next) => {
 const projectIdExists = await Project.get(req.body.project_id)
if(!projectIdExists) {
    res.status(400).json({
        message: "Invalid project_id"   
    })
}

Actions.insert({
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed || false,
    })
      .then((newAction) => {
        res.status(201).json(newAction);
      })
      .catch(next);
  });
  
  router.put("/:id", validateActionData, validateById, async (req, res, next) => {
      try {
        const updated = await Actions.update(req.params.id, req.body);
        if (!updated) {
          return res.status(404).json({
            message: "Action not found.",
          });
        }

        res.json(updated);
      } catch (err) {
        next(err);
      }
    }
  );
  
  router.delete("/:id", validateById, async (req, res, next) => {
    try {
      await Actions.remove(req.params.id);
      res.json(req.action);
    } catch (err) {
      next(err);
    }
  });

module.exports = router


