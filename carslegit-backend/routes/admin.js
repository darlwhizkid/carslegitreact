const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { 
    getDetailedAnalytics, 
    getAllUsers, 
    getDocuments,
    updateDocumentStatus,
    generateReport
} = require('../controllers/adminController');

router.get('/analytics', adminAuth, getDetailedAnalytics);
router.get('/users', adminAuth, getAllUsers);
router.get('/documents', adminAuth, getDocuments);
router.put('/documents/:id/status', adminAuth, updateDocumentStatus);
router.get('/reports/:type', adminAuth, generateReport);

module.exports = router;