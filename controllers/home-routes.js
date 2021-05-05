const router = require("express").Router();
const sequelize = require("../config/connection");
const { Story, User, Contribution, Like } = require("../models");

router.get("/", async (req, res) => {
  try {
    let allStories = (
      await Story.findAll({
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
            attributes: [
              "id",
              "contribution_text",
              "story_id",
              "user_id",
              "created_at",
            ],
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
            attributes: [],
          },
        ],
      })
    ).map((post) => post.get({ plain: true }));

    let userStories;
    if (req.session.loggedIn) {
      userStories = await Story.findAll({
        raw: true,
        attributes: { exclude: ["password"] },
        where: {
          user_id: req.session.user_id,
        },
      });
    }

    console.log(allStories, userStories);
    res.render("homepage", {
      allStories,
      userStories,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

router.get("/profile", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }
  try {
    let userStories = await Story.findAll({
      raw: true,
      where: {
        user_id: req.session.user_id,
      },
    });

    res.render("profile", {
      userStories,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
