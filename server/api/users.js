const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
});

router.put('/:id', async (req, res, next) => {
  try {
    // const user = req.user;
    const user = await User.findById(req.params.id);
    console.log('req.body should be updated user', req.body);
    if (!user) {
      res.sendStatus(404);
    }
    const updatedUser = await user.update(req.body);
    console.log('updatedUser in backend -------------', updatedUser);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});
