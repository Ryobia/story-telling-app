const router = require("express").Router();
const sequelize = require("../config/connection");
const { Story, User, Contribution } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
  // Story.findAll({
  //   attributes: [
  //     "id",
  //     "title",
  //     "beginning",
  //     "created_at",
  //     [
  //       sequelize.literal(
  //         "(SELECT COUNT(*) FROM like WHERE story.id = like.story_id)"
  //       ),
  //       "like_count",
  //     ],
  //   ],
  //   include: [
  //     {
  //       model: Contribution,
  //       attributes: ["id", "contribution_text", "story_id", "user_id", "created_at"],
  //       include: {
  //         model: User,
  //         attributes: ["username"],
  //       },
  //     },
  //     {
  //       model: User,
  //       attributes: ["username"],
  //     },
  //   ],
  // })
  //   .then((dbPostData) => {
  //     const stories = dbPostData.map((post) => post.get({ plain: true }));
      // pass a single post object into the homepage template
      const stories = [];
      res.render("homepage", { 
        stories,
      loggedIn: req.session.loggedIn });
    // })
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).json(err);
    // });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get('/:id', (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Story,
          attributes: ['id', 'title', 'beginning', 'created_at'],
        },
        {
          model: Contribution,
          attributes: ['id', 'contribution_text', 'created_at'],
          include: {
            model: Story,
            attributes: ['title'],
          },
        },
        {
          model: Story,
          attributes: ['title'],
          through: Like,
          as: 'liked_stories',
        }
      ]
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
