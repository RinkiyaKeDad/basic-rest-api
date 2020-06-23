const express = require('express');
const router = express.Router();

const imagesControllers = require('../controllers/images-controllers');

router.get('/', imagesControllers.getImages);
router.post('/', imagesControllers.makeImage);
module.exports = router;
