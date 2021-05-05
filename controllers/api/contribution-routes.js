const router = require('express').Router();
const { Contribution } = require('../../models');

router.get('/', (req, res) => {
    Contribution.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'contribution_text',
            'user_id',
            'story_id',
            'created_at'
        ]
    })
    .then((dbContData) => res.json(dbContData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  // check the session
  // if (req.session) {
    Contribution.create({
      contribution_text: req.body.contribution_text,
      story_id: req.body.story_id,
      user_id: req.body.user_id
    })
      .then(dbContData => res.json(dbContData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  // }
});

router.delete('/:id', (req, res) => {
    Contribution.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((dbContData) => {
          if (!dbContData) {
            res.status(404).json({ message: "No contribution found with this id" });
            return;
          }
          res.json(dbContData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;