const router = require('express').Router();
const AuthController = require('../controllers/UserController');


//post methods
router.post('/register', AuthController.register);
router.post('/login', AuthController.Login);
router.get('/logout', AuthController.Logout);


module.exports = router;