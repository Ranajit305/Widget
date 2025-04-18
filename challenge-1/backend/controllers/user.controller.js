import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js';

export const checkAuth = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({success: true, user})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({success: false, message: 'Fields Missing'});
        }

        const isUser = await User.findOne({username});
        if (isUser) {
            return res.status(400).json({success: false, message: 'Username not Available'})
        }

        if (password.length < 5) {
            return res.status(400).json({success: false, message: 'Weak Password'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User ({
            username,
            password: hashedPassword
        });
        const token = generateToken(newUser._id, res);
        await newUser.save();
        const user = newUser.toObject();
        delete user.password;
        res.status(201).json({success: true, user, token, message: 'Account Created'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({success: false, message: 'Fields Missing'});
        }

        const isUser = await User.findOne({username});
        if (!isUser) {
            return res.status(400).json({success: false, message: 'User not Found'});
        }

        const isPassword = await bcrypt.compare(password, isUser.password);
        if (!isPassword) {
            return res.status(400).json({success: false, message: 'Incorrect Password'});
        }
        
        const token = generateToken(isUser._id, res);
        const user = isUser.toObject();
        delete user.password;
        res.status(200).json({success: true, user, token, message: 'Welcome Back'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt', { maxAge: 0 });
        res.status(200).json({success: true, message: 'Logged Out'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}