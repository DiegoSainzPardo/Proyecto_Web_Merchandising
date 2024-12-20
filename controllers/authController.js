const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Element = require('../models/Element');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteElement = async (req, res) => {
    try {
        const element = await Element.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!element) {
            return res.status(404).json({ message: 'Element not found or not authorized' });
        }
        res.status(200).json({ message: 'Element deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
