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
  res.json(req.body);
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

router.put("/:id", validateProjectData, validateById, (req, res, next) => {
  Project.update(req.params.id, req.body)

    .then(() => {
      return Project.get(req.params.id);
    })
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

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
