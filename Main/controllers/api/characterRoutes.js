const router = require('express').Router();
const { User, Character } = require('../../models');
const withAuth = require("../../utils/auth");

router.get('/', async (req, res) => {
  try {
    const characterData = await Character.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const characters = characterData.map((character) => character.get({ plain: true }));
    console.log(characters)
    // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   posts, 
    //   logged_in: req.session.logged_in 
    // });
    res.status(200).json(characterData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


router.get('/create', async (req, res) => {
  try {
    // const characterData = await Character.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // const characters = characterData.map((character) => character.get({ plain: true }));
    console.log("hello")
    res.render('create', { 
      // posts, 
      logged_in: req.session.logged_in 
    });
    // res.status(200).json(characterData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
    try {
      const characterData = await Character.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });
  
      const character = characterData.get({ plain: true });
      console.log(character)
      res.render("detail", {
        character,
        logged_in: req.session.logged_in,
      });
    // res.status(200).json(characterData)

    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newCharacter = await Character.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newCharacter);
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try {
       const characterData = await Character.destroy({
        logged_in: true ,
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
       });
       if (!characterData) {
        res.status(404).json({ message: "No character with this id."});
        return;
       }
       console.log(req.session)
       console.log(req.session.logged_in)
       res.status(202).json(characterData);
    } catch (err) {
        res.status(500).json(err);
    }
  });

  module.exports = router;