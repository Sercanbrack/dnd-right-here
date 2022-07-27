const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    try {
      
      const userData = await User.findAll({
        
        });
  
      const users = userData.map((user) => user.get({ plain: true }));
  

      res.status(200).json(userData)
    } catch (err) {
      console.log(err)
      res.status(500).json("why u no"+err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
    //   req.session.save(() => {
    //     req.session.user_id = userData.id;
    //     req.session.logged_in = true;
    //   })
        res.status(200).json(userData);
      
    } catch (err) {
      console.log("didn't make it " + err)
      res.status(400).json(err);
    } 
  });

  module.exports = router;
