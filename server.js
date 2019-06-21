const express = require('express');

const Users = require('./models/usersModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'ALIVE' });
});

server.post('/users', (req, res) => {
  const user = req.body
  Users.add(user)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(
      { message: "ruh roh", error: err }
    ))
})

server.delete('/users/:id', (req, res) => {
  const id = req.params.id
  Users.remove(id)
    .then(data => {
      data ? res.status(204).end() : res.status(404).json({ message: "invalid id" })
    })
    .catch(err => res.status(500).json(
      { message: "ruh roh", error: err }
    ))
})

module.exports = server;