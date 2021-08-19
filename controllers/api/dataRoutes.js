const router = require('express').Router();
const Json2csvParser = require("json2csv").Parser;
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
            data.forEach((x) => {
              returnArr.push(x['name']);
            });

            return returnArr;
          },
        });
      });

    const json2csvParser = new Json2csvParser({ header: true });
    const csvData = json2csvParser.parse(missions);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=missions.csv");

    res.status(200).end(csvData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;