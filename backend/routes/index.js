const express = require('express');
const apiRoutes = require('../controllers/api'); 
const homeRoutes = require('../routes/homeRoutes');

const router = express.Router();

router.use('/api', apiRoutes);

router.use('/', homeRoutes);

module.exports = router;