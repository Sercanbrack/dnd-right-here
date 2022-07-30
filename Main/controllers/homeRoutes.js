const router = require("express").Router();
const { User, Character } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {

  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Character }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('homepage', {
      ...user,
      logged_in: true
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