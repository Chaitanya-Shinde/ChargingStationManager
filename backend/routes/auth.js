const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        console.log("running");
        
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashed });
        await user.save();
        console.log("Login user: ",user);
        
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); 

router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
        console.log("Register user: ", user, token);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
