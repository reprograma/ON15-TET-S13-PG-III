const express = require('express');
const router = express.Router();

const controller = require('../controller/establishmentController')

router.get('/all', controller.getAll);

router.post('/create', controller.createEstablishment);

// router.put('/update/:id', controller.updateEstablishment);

// router.delete('/delet/:id', controller.deleteEstablishment);

module.exports = router;
