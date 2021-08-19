const router = require('express').Router();
const {
  Mission,
  Hero,
  User
} = require('../models');
const withAuth = require('../utils/auth');

// Homepage UBER route
router.get(['/', '/:id([0-9]{1,})'], async (req, res) => {
  let page, offset;
  // Define page vars
  if (req.params.id) {
    page = req.params.id;
    offset = page * 20;
  } else {
    page = 0;
    offset = 0;
  }

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
    include: [{
      model: Hero,
      attributes: ['name'],
      required: false,
      raw: true,
      nest: true,
    },],
    offset: offset,
    limit: 20,
    order: [
      ['date_created', 'DESC']
    ],
  });

  // If page empty, redirect back
  if (!currentMissionData[0]) {
    if (page <= 1) {
      res.redirect('/');
    } else {
      res.redirect(`/${Number(page) - 1}`);
    }
  } else {
    let missions = [];
    // Serialize data so the template can read it
    currentMissionData
      .map((x) => x.get({
        plain: true
      }))
      .map((x) => {
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
          heros: () => {
            let data = x.heros;
            let returnArr = [];
            data.forEach((x) => {
              returnArr.push(x['name']);
            });

            return returnArr;
          },
        });
      });

    let pageLinks = [];
    // Define page render vars
    if (Number(page) === 0) {
      pageLinks = [{
        path: '/',
        display: 1,
      },
      {
        path: '/1',
        display: 2,
      },
      {
        path: '/2',
        display: 3,
      },
      ];
    } else {
      pageLinks = [{
        path: `/${Number(page) - 1}`,
        display: `${Number(page)}`,
      },
      {
        path: `/${Number(page)}`,
        display: `${Number(page) + 1}`,
      },
      {
        path: `/${Number(page) + 1}`,
        display: `${Number(page) + 2}`,
      },
      ];
    }

    // If page invalid, redirect back
    if (page < 0) res.redirect('/');
    
    try {
      res.status(200).render('homepage', {
        missions,
        logged_in: req.session.logged_in,
        pageLinks,
      });
    } catch {
      res.status(500).json(err);
    }
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
      include: [{
        model: Hero,
        attributes: ['name'],
      },],
    });

    // Serialize data so the template can read it
    let mission = selectedMissionData.get({ plain: true });

    if (mission.heros.length === 0) {
      mission.hero = 'Unassigned';
    } else {
      const heroname = mission.heros[0].name;
      mission.hero = heroname;
    }

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
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Hero,
        attributes: [
          ['name', 'hero_name'],
          'secret_identity',
          'organization',
          'powers',
          'weakness',
        ],
        include: [{
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
        },],
      },],
    });

    const user = userData.get({
      plain: true
    });

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
      order: [
        ['date_created', 'DESC']
      ],
    });

    missions = listOfAvailableMissions.map((x) => x.get({
      plain: true
    }));

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

  res.render('missionCreate', {
    logged_in: req.session.logged_in,
  });
});

router.get('/roster', withAuth, async (req, res) => {
  try {
    const heroRoster = await Hero.findAll({
      attributes: {
        include: [
          'name',
          'secret_identity',
          'organization',
          'powers',
          'weakness',
        ],
      },
      order: [
        ['organization', 'DESC']
      ],
    });
    let heroList = heroRoster.map((x) => x.get({
      plain: true
    }));

    res.render('roster', {
      heroList,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;