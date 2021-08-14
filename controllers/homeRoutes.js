const router = require('express').Router();
const { Mission, Hero, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all missions and JOIN with user data
    const currentMissionData = await Mission.findAll({
      attributes: {
        include: [
          ['id', 'mission_id'],
          ['name', 'mission_name'],
          'location',
          'date_created',
          'priority',
          'status',
        ],
      },
      include: [
        {
          model: Hero,
          attributes: ['name'],
          required: false,
          raw: true,
          nest: true,
        },
      ],
      order: [['date_created', 'DESC']],
    });
    console.log(currentMissionData);
    let missions = [];
    // Serialize data so the template can read it
    currentMissionData
      .map((x) => x.get({ plain: true }))
      .map((x) => {
        console.log(x.heros);
        missions.push({
          id: x.id,
          name: x.name,
          location: x.location,
          description: x.description,
          status: x.status,
          date_created: x.date_created,
          priority: x.priority,
          mission_id: x.mission_id,
          mission_name: x.mission_name,
          heros: x.heros[0] ? x.heros[0].name : null,
        });
      });
    console.log(missions);
    res.status(200).render('homepage', {
      missions,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/mission/:id', withAuth, async (req, res) => {
  try {
    // Get specific mission
    const selectedMissionData = await Mission.findByPk(req.params.id, {
      attributes: {
        include: [
          ['id', 'mission_id'],
          ['name', 'mission_name'],
          'location',
          'priority',
          'status',
          'description',
          'date_created',
        ],
      },
      include: [
        {
          model: Hero,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    let mission = selectedMissionData.get({ plain: true });
    const heroname = mission.heros[0].name;
    mission.hero = heroname;


    res.status(200).render('mission', {
      ...mission,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    let listOfAvailableMissions, missions;
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Hero,
          attributes: [
            ['name', 'hero_name'],
            'secret_identity',
            'organization',
            'powers',
            'weakness',
          ],
          include: [
            {
              model: Mission,
              attributes: [
                ['id', 'mission_id'],
                ['name', 'mission_name'],
                'location',
                'date_created',
                'priority',
                'status',
                'description',
              ],
            },
          ],
        },
      ],
    });

    const user = userData.get({ plain: true });

    console.log(user.hero.mission);

    if (!user.hero.mission) {
      listOfAvailableMissions = await Mission.findAll({
        attributes: {
          include: [
            ['id', 'mission_id'],
            ['name', 'mission_name'],
            'location',
            'date_created',
            'priority',
            'status',
          ],
        },
        order: [['date_created', 'DESC']],
      });

      missions = listOfAvailableMissions.map((x) => x.get({ plain: true }));
    }

    res.render('profile', {
      ...user,
      missions,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/create', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  res.render('missionCreate');
});
module.exports = router;
