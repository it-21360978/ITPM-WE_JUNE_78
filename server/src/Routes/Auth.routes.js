const router = require('express').Router();
const AuthController = require('../controllers/UserController');


//post methods
// router.post('/register', AuthController.register);
// router.post('/login', AuthController.Login);
// router.get('/logout', AuthController.Logout);
router.route('/register').post(AuthController.register);
router.route('/login').post(AuthController.Login);
router.route('/logout').get(AuthController.Logout);
router.route('/forgot').post(AuthController.forgotPassword);
router.route('/reset/:token').post(AuthController.resetPassword);
// router.route('/auth/google').post(AuthController.googleLogin);


module.exports = router;