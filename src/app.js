const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const project = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const indexProject = repositories.findIndex(project => project.id === id);

  if (indexProject < 0) {
    return response.status(400).json({ error: 'project id not found' });
  }

  const { likes } = repositories[indexProject];

  const project = {id, title, url, techs, likes };
  repositories[indexProject] = project;

  return response.json(project);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indexProject = repositories.findIndex(project => project.id === id);

  if (indexProject < 0) {
    return response.status(400).json({ error: 'project id not found' });
  }

  repositories.splice(indexProject, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const indexProject = repositories.findIndex(project => project.id === id);

  if (indexProject < 0) {
    return response.status(400).json({ error: 'project id not found' });
  }

  const { title, url, techs, likes } = repositories[indexProject];

  const project = {id, title, url, techs, likes: likes + 1 };
  repositories[indexProject] = project;

  return response.json(project);
});

module.exports = app;
