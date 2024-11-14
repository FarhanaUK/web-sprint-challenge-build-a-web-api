// Write your "project" router here!
const express = require("express");

const Project = require("./projects-model");
const {
  validateProjectData,
  errorHandler,
  validateById,
} = require("./projects-middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const project = await Project.get();
  if (!project || project.length === 0) {
    res.send([]);
  } else {
    res.json(project);
  }
});

router.get("/:id", validateById, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProjectData, (req, res, next) => {
  Project.insert({
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed || false,
  })
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", validateProjectData, validateById, async(req, res, next) => {
  try {
    const updated = await Project.update(req.params.id, req.body);
    if (!updated) {
    
      return res.status(400).json({
        message: "Project not found.",
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
    await Project.remove(req.params.id);
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateById, async (req, res, next) => {
  try {
    const result = await Project.getProjectActions(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
