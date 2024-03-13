const express = require('express');
const userController = require('../controllers/api/userController');
// const authenticateToken = require('../utils/auth');
const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/getuser/:id', userController.getUserById);
router.put('/updateuser/:id', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);

module.exports = router;
