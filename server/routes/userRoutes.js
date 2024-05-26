const express = require('express');
const { getUserInfo, updateUser, changePassword  } = require('../controllers/userController');
const requireLogin = require('../middleware/auth');

const router = express.Router();

router.get('/user', requireLogin, getUserInfo);
router.post('/update-user', requireLogin, updateUser);
router.post('/change-password', requireLogin, changePassword);

module.exports = router;
