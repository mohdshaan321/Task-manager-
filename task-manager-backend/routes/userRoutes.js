const express = require('express');
const router = express.Router();
const {registerUser, authUser} = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/login', (req, res) => {
  res.send('✅ Login route is reachable');
});

module.exports = router;