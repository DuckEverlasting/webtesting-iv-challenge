const db = require('../data/dbConfig.js');

const { add, remove } = require('./usersModel.js');

describe('Users model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('add function', () => {
    it('should add a user', async () => {
      let users = await db('users');
      expect(users).toHaveLength(0)

      await add({ username: 'Bill', department: 'Accounting' });

      users = await db('users');
      expect(users).toHaveLength(1)
    })

    it('should add the given user', async () => {
      let user = { username: 'Bill', department: 'Accounting' };
      await add(user)
      let users = await db('users');
      const names = users.map(user => user.username)
      const department = users.map(user => user.department)
      expect(names).toContain(user.username)
      expect(department).toContain(user.department)
    })
  })

  describe('remove function', () => {
    it('should remove a user', async () => {
      await add({ username: 'Bill', department: 'Accounting' });
      await add({ username: 'Jeff', department: 'Accounting' });
      let users = await db('users');
      expect(users).toHaveLength(2);

      await remove(1)

      users = await db('users');
      expect(users).toHaveLength(1);
    })

    it('should remove the given user', async () => {
      await add({ username: 'Bill', department: 'Accounting' });
      await add({ username: 'Jeff', department: 'Accounting' });
      let users = await db('users');
      const id = users[0].id;
      
      await remove(id);

      users = await db('users');
      const ids = users.map(user => user.id);
      expect(ids).not.toContain(id);
    })
  })
});
