const router = require("express").Router();
const { User, Character } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
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


router.get("/character/:id", async (req, res) => {
  try {
    const characterData = await Character.findByPK(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const character = characterData.get({ plain: true });

    res.render("character", {
      ...character,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      console.log("you are logged")
        res.redirect("/");
        return;
    }
    console.log("you are not logged")
    res.render("login");
});


module.exports = router;