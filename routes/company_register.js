const express = require('express');
const router = express.Router();

// Require controller modules.
const company = require('../controllers/companyRegisterController');
/// Company ROUTES ///

// GET catalog home page.
router.get('/', company.company_list);

// POST request for creating Book.
router.post('/create', company.company_create_post);

// POST update request
router.post('/update', company.update_company);

// POST request for delete
router.post('/delete', company.company_delete);

module.exports = router;