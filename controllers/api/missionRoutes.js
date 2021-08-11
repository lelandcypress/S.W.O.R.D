const router = require('express').Router();
const { Mission, Hero, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Mission.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {

    // This might be busted
    const canUpdate = async () => {
      const heroMissionID = await User.findByPk(
      req.session.user_id,
      {
        include: [{
          model: Hero,
          attributes: ['mission_id']
        }]
      });

      const heroesCurrentMission = heroMissionID.get({ plain:true })

      mID = heroesCurrentMission['mission_id'];

      if (mID == req.params.id) return true;
      return false;
    };

    if (!canUpdate) {
      res.status(403);
      return;
    }

    const missionData = await Mission.update(
    {
      status: req.body.status,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if (!missionData) {
      res.status(404).json({ message: 'No mission found with this id!' });
      return;
    }

    res.status(200).json(missionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
