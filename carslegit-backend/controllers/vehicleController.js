const Vehicle = require('../models/Vehicle');

// Add vehicle
exports.addVehicle = async (req, res) => {
    try {
        const { make, model, year, registrationNumber, registrationExpiry } = req.body;
        
        const vehicle = new Vehicle({
            user: req.user.userId,
            make,
            model,
            year,
            registrationNumber,
            registrationExpiry
        });

        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error adding vehicle', error: error.message });
    }
};

// Get user's vehicles
exports.getUserVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ user: req.user.userId });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
    }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            req.body,
            { new: true }
        );
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle', error: error.message });
    }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user.userId 
        });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
    }
};
