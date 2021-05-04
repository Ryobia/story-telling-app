const router = require("express").Router();
const sequelize = require("../config/connection");
const { Story, User, Contribution, Like } = require("../models");

router.get("/", (req, res) => {
  Story.findAll({
    attributes: [
      "id",
      "title",
      "beginning",
      "created_at",
      // [sequelize.fn("COUNT", sequelize.col("likes.id")),"like_count"]
    ],
    include: [
      {
        model: Contribution,
        attributes: ["id", "contribution_text", "story_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Like,
        attributes:[],
      }
    ],
  })
    .then((dbPostData) => {
      const stories = dbPostData.map((post) => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render("homepage", { 
        stories,
      loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

    
});



router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

router.get("/profile", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }
  res.render("profile");
})

router.get('/', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.session.id,
    },
    include: [
      {
        model: Story,
        attributes: ['id', 'title', 'beginning', 'created_at'],
      },
    ]
  })
  .then((dbPostData) => {
    const userstories = dbPostData.map((post) => post.get({ plain: true }));
    // pass a single post object into the homepage template
    res.render("homepage", { 
      userstories,
    loggedIn: req.session.loggedIn });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
