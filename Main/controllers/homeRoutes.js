const router = require("express").Router();
const { User, Character } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  console.log("homeroute root get")
  try {
    const characterData = await Character.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const character = characterData.map((character) =>
      character.get({ plain: true })
    );
    res.render("homepage", {
      character,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/homepage", async (req, res) => {
  try {
    const characterData = await Character.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const character = characterData.map((character) =>
      character.get({ plain: true })
    );

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    })
    res.render("homepage", {
      character,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});



module.exports = router;