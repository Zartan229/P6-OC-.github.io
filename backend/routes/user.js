const express = require('express');
//const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup' , userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;



//router.post('/', auth, multer, stuffCtrl.createThing);