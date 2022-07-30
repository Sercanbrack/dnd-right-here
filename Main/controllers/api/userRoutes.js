const router = require('express').Router();
const { User, Character } = require('../../models');

router.get('/all', async (req, res) => {
    // try {
      
    //   const userData = await User.findAll({
        
    //     });
  
    //   const users = userData.map((user) => user.get({ plain: true }));
  

    //   res.status(200).json(userData)
    // } catch (err) {
    //   console.log(err)
    //   res.status(500).json("why u no"+err);
    // }

    try {
      const userData = await User.findAll({
        include: [
          {
            model: Character,
            attributes: ['name'],
          },
        ],
      });
  
      const users = userData.map((user) => user.get({ plain: true }));
      console.log(users)
      // Pass serialized data and session flag into template
      // res.render('homepage', { 
      //   posts, 
      //   logged_in: req.session.logged_in 
      // });
      res.status(200).json(userData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      console.log(userData)
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.name = userData.name;
        req.session.logged_in = true;
        console.log("session logged in?", req.session.logged_in)
        res.status(200).json(userData);

      })

        
    } catch (err) {
      console.log("didn't make it " + err)
      res.status(400).json(err);
    } 
  });

  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.name = userData.name
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;
