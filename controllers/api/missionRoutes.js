const router = require('express').Router();
const { Mission, Hero, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newProject = await Mission.create({
      ...req.body,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    // Check if the user can update
    const canUpdate = async (user, id) => {
      const heroMissionID = await User.findByPk(user, {
        include: [
          {
            model: Hero,
            attributes: ['mission_id'],
          },
        ],
      });

      const heroesCurrentMission = heroMissionID.get({ plain: true });
      mID = heroesCurrentMission['hero'].mission_id;

      if (mID == id) {
        return true;
      };
      return false;
    };

    const iCanUpdate = await canUpdate(req.session.user_id, req.params.id);

    if (!iCanUpdate) {
      res.status(403);
      return;
    } else {
      const missionData = await Mission.update(
        {
          status: req.body.body,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      console.log(missionData);

      if (!missionData) {
        res.status(404).json({ message: 'No mission found with this id!' });
        return;
      }

      res.status(200).json(missionData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
