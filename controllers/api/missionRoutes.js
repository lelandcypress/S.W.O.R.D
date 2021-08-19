const router = require('express').Router();
const { Mission, Hero, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newMission = await Mission.create({
      ...req.body,
    });

    res.status(200).json(newMission);
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
router.put('/heroassign/:id', async (req, res) => {
  try {
    const heroName = await User.findByPk(req.session.user_id, {
      attributes: ['hero_id'],
    });
    const heroNow = heroName.get({ plain: true });

    const updatedMission = await Hero.update(
      {
        mission_id: req.params.id,
      },
      {
        where: {
          id: heroNow.hero_id,
        },
      }
    );
    res.status(200).json(updatedMission);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
