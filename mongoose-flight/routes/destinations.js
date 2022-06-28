const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations');

router.get('/flights/:id/destinations/new', destinationsCtrl.new);
router.get('/flights/:id', destinationsCtrl.return);
router.post('/flights/:id/destinations', destinationsCtrl.create);
router.delete('/destinations/:id', destinationsCtrl.delete);

module.exports = router;