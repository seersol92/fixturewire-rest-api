const express = require('express');
const router = express.Router();

// Require controller modules.
const cargo_controller = require('../controllers/cargoRegisterController');
/// CARGO QUOTE ROUTES ///

router.get('/', cargo_controller.cargo_list);

// POST request for creating Cargo.
router.post('/create', cargo_controller.cargo_create_post);

//Post request for update Cargo
router.post('/update', cargo_controller.update_cargo);

// POST request for Delete Cargo.
router.post('/delete', cargo_controller.cargo_delete);

module.exports = router;