const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

exports.createUser = async (req, res) => {

    try {
        console.log(req.body); 
        const {
            email,
            password,
            first_name, 
            last_name,
            health_goals,
            workout_preferences,
            diet_type,
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            health_goals,
            workout_preferences,
            diet_type,
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errors: [{ user: "not found" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ password: "incorrect" }] });
        }

        const access_token = jwt.sign(
            { email: user.email, _id: user._id },
            JWT_SECRET, 
            { expiresIn: '3600s' }
        );
        res.status(200).json({
            success: true,
            token: "Bearer " + access_token,
            user: user._id
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ errors: error });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
