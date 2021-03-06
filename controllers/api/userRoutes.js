const router = require('express').Router();
const { User, Hero } = require('../../models');

router.post('/', async (req, res) => {
  try {

    const {
      username,
      email,
      password,
      name,
      secret_identity,
      organization,
      powers,
      weakness
    } = req.body;

    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
      hero: {
        name: name,
        secret_identity: secret_identity,
        organization: organization,
        powers: powers,
        weakness: weakness
      }
    },{
      include: [{
        association: User.belongsTo(Hero)
      }]
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
