const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove 
};

function find() {
  return null;
}

function findById(id) {
  return null;
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      [id] = ids;
      return id;
    });
}

function update(id, changes) {
  return null;
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}