const router = require('express').Router()
const { transfer } = require('../controllers/transfer')
const { user } = require('../controllers/user')

router.post('/', transfer)
router.get('/user', user)

module.exports = router