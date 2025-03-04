const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
    addVehicle, 
    getUserVehicles, 
    updateVehicle, 
    deleteVehicle 
} = require('../controllers/vehicleController');

// All routes are protected with auth middleware
router.post('/', auth, addVehicle);
router.get('/', auth, getUserVehicles);
router.put('/:id', auth, updateVehicle);
router.delete('/:id', auth, deleteVehicle);

module.exports = router;
