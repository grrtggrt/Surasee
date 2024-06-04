// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const {uploadDataSubject, uploadDataBuilding, uploadDataMajor } = require('../controllers/uploadController');

const router = express.Router();
const upload = multer();

router.post('/uploadSubject', upload.single('file'), uploadDataSubject);
router.post('/uploadMajor', upload.single('file'), uploadDataMajor);
router.post('/uploadbuilding', upload.single('file'), uploadDataBuilding);

module.exports = router;
