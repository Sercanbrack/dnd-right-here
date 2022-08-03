const router = require("express").Router();
const { User, Character } = require("../models");
const withAuth = require("../utils/auth");


router.get("/homepage", withAuth, async (req, res) => {

  try {
    const characterData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Character }],
    });
    const characters = characterData.characters.map((user) => user.get(({plain: true})));
    const toRender = {characters, logged_in: true}
    console.log(toRender.characters[0].id)
    res.render('homepage', toRender);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/homepage");
        return;
    }
    res.render("login");
});

router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/homepage");
} else {
  res.redirect("/login");
}
});





module.exports = router;