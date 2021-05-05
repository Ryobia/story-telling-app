const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Story, User, Like, Contribution } = require("../../models");

router.get("/", (req, res) => {
  console.log("=================");
  Story.findAll({
    order: [["created_at", "DESC"]],
    attributes: [
      "id",
      "title",
      "beginning",
      "created_at",
      // [sequelize.fn("COUNT", sequelize.col("likes.id")),"like_count"],

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
        attributes:[],
      }
    ],
  })
    .then((dbStoryData) => res.json(dbStoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/:username', (req, res) => {
//   console.log("works");
//   Story.findAll({
//     where: {
//       user: "Ryobia"
//     },
//     attributes: [
//       'id',
//       'title',
//     ]
//   })
//   .then((dbStoryData) => res.json(dbStoryData))
//   .catch((err) => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

router.get("/:id", (req, res) => {
  Story.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "beginning",
      "created_at",
      [sequelize.fn("COUNT", sequelize.col("likes.id")),"like_count"]

    ],
    include: [
      {
        model: Contribution,
        attributes: [
          "id",
          "contribution_text",
          "user_id",
          "story_id",
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
        attributes:[],
      }
    ],
  })
    .then((dbStoryData) => {
      if (!dbStoryData) {
        res.status(404).json({ message: "No Story found with this id" });
        return;
      }
      res.json(dbStoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Story.create({
    // {
    //   "title": "Story 1",
    //   "beginning": "Everyone add a word one by one",
    //   "user_id": 2
    // }

    title: req.body.title,
    beginning: req.body.beginning,
    user_id: req.session.user_id,
  })
    .then((dbStoryData) => res.json(dbStoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/like", (req, res) => {
  if (req.session) {
    Story.like(
      { ...req.body, user_id: req.session.user_id },
      { Like, Contribution, User }
    )
      .then((updatedLikeData) => res.json(updatedLikeData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.put("/:id", (req, res) => {
  Story.update(
    {
      title: req.body.title,
      beginning: req.body.beginning
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbStoryData) => {
      if (!dbStoryData) {
        res.status(404).json({ message: "No Story found with this id" });
        return;
      }
      res.json(dbStoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Story.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbStoryData) => {
      if (!dbStoryData) {
        res.status(404).json({ message: "No Story found with this id" });
        return;
      }
      res.json(dbStoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
