const express = require('express');
const ChargingStation = require('../models/ChargingStation');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
    try {
        const station = new ChargingStation(req.body);
        await station.save();
        console.log(station);
        
        res.status(201).json(station);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read all
router.get('/', async (req, res) => {
    try {
        const stations = await ChargingStation.find();
        res.json(stations);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const updated = await ChargingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await ChargingStation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;