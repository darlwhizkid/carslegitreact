const User = require('../models/User');
const Vehicle = require('../models/Vehicle');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalVehicles = await Vehicle.countDocuments();
        const recentRegistrations = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('-password');

        res.json({
            totalUsers,
            totalVehicles,
            recentRegistrations
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics' });
    }
};

const Document = require('../models/Document');

// Add these functions to the existing adminController

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find()
            .populate('user', 'name email')
            .populate('vehicle', 'make model registrationNumber')
            .sort({ createdAt: -1 });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents' });
    }
};

exports.updateDocumentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const document = await Document.findByIdAndUpdate(
            id,
            { 
                status,
                verifiedBy: req.user.userId,
                verifiedAt: Date.now()
            },
            { new: true }
        );

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error updating document status' });
    }
};

// Add these analytics functions to the existing adminController

exports.getDetailedAnalytics = async (req, res) => {
    try {
        const now = new Date();
        const lastMonth = new Date(now.setMonth(now.getMonth() - 1));

        const userGrowth = await User.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const documentStats = await Document.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const stateDistribution = await User.aggregate([
            {
                $group: {
                    _id: "$state",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            userGrowth,
            documentStats,
            stateDistribution,
            totalUsers: await User.countDocuments(),
            activeVehicles: await Vehicle.countDocuments({ status: 'active' }),
            pendingVerifications: await Document.countDocuments({ status: 'pending' })
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics data' });
    }
};

exports.generateReport = async (req, res) => {
    try {
        const { type } = req.params;
        let data;

        switch(type) {
            case 'users':
                data = await User.find().select('-password');
                break;
            case 'documents':
                data = await Document.find().populate('user vehicle');
                break;
            default:
                return res.status(400).json({ message: 'Invalid report type' });
        }

        // Convert to CSV
        const csv = convertToCSV(data);
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${type}-report.csv`);
        res.send(csv);
    } catch (error) {
        res.status(500).json({ message: 'Error generating report' });
    }
};
