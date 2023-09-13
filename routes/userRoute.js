const express = require('express')
const { getUser, getCurrent, postLogin, postRegister } = require('../controllers/userController')
const validateTokent = require('../middlewares/validateToken')
const router = express.Router()

router.route('/register').post(postRegister)

router.route('/login').post(postLogin)

router.route('/current').get(validateTokent, getCurrent)

module.exports = router