const router = require('express').Router();
const { User, Character } = require('../../models');

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

  router.post("/api/create", async (req, res) => {
    try {
        const characterData = Character.create({
            include: [
               {
                 model: Character,
                attributes: [
                    id, 
                    user_id,
                    name, 
                    classes, 
                    race, 
                    level, 
                    hitPoints, 
                    strength, 
                    dexterity, 
                    constitution, 
                    intelligence, 
                    wisdom, 
                    charisma, 
                    armorClass, 
                    attacks, 
                    spells],
                },
            ],
        });
    } catch (err) {
        res.status(500).json(err);
    }
  });

  router.delete('/character/id:', async (req, rex) => {
    try {
       const characterData = await Character.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
       });
       if (!characterData) {
        res.status(404).json({ message: "No character with this id."});
        return;
       }
       res.status(202).json(characterData);
    } catch (err) {
        res.status(500).json(err);
    }
  });

  module.exports = router;