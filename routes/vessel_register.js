const express = require('express');
const router = express.Router();
//access token middle ware
// Require controller modules.
const vessel_controller = require('../controllers/vesselRegisterController');
/// Vessel ROUTES ///

// GET catalog home page.
router.get('/', vessel_controller.vessel_list);

// POST request for creating Book.
router.post('/create', vessel_controller.vessel_create_post);

//Post Update Request
router.post('/update', vessel_controller.vessel_update_post);

// POST request for delete
router.post('/delete', vessel_controller.vessel_delete);

module.exports = router;