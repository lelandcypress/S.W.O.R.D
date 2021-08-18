const router = require('express').Router();
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
const { Mission, Hero, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/missions', async (req, res) => {
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
      limit: 20,
      order: [['date_created', 'DESC']],
    });

    let missions = [];
    // Serialize data so the template can read it
    currentMissionData
      .map((x) => x.get({ plain: true }))
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
            data.forEach( (x) => {
              returnArr.push(x['name']);
            } );

            return returnArr;
          },
        });
      });

      const json2csvParser = new Json2csvParser({ header: true});
      const csvData = json2csvParser.parse(missions);
      
    //   fs.writeFile("missions.csv", csv, function(error) {
    //     if (error) throw error;
    //     console.log("Write to missions.csv successfully!");
    //   });
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=missions.csv");

    res.status(200).end(csvData);


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

    const json2csvParser = new Json2csvParser({ header: true});
      const csvData = json2csvParser.parse(mission);
      
    //   fs.writeFile("missions.csv", csv, function(error) {
    //     if (error) throw error;
    //     console.log("Write to missions.csv successfully!");
    //   });
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=missions.csv");

    res.status(200).end(csvData);

    
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

    // console.log(user.hero.mission);

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
    const json2csvParser = new Json2csvParser({ header: true});
      const csvData = json2csvParser.parse(missions);
      
    //   fs.writeFile("missions.csv", csv, function(error) {
    //     if (error) throw error;
    //     console.log("Write to missions.csv successfully!");
    //   });
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=missions.csv");

    res.status(200).end(csvData);

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;