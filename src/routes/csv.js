const router = require('express').Router();

const csvController = require('../controllers/csvController');

router.get('/', csvController.get);
router.post('/add', csvController.save);

module.exports = router;

