const express = require('express');
const userController = require('../controllers/api/userController');
// const authenticateToken = require('../utils/auth');
const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
