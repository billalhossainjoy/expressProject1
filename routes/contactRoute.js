const express = require('express')
const { getContact, postContact, getidContact,  deleteContact, updateContact } = require('../controllers/contactController')
const validateTokent = require('../middlewares/validateToken')
const router = express.Router()

router.use(validateTokent)
router.route('/').get(getContact).post(postContact)
router.route('/:id').get(getidContact).put(updateContact).delete(deleteContact)

module.exports = router