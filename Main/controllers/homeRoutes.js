const router = require("express").Router();
const { User, Character } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
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
      loggec_in: req.session.logged_in,
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

router.get('/', withAuth, async (req,res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ["password"]},
            include: [{model: Character}],
        });

        const user = userData.get({plain: true});

        res.render('/', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

router.get("/new.character", async, (req, res) => {
    try{
        const characterData = await // not sure how to carry on here
    }
})

module.exprots = router;