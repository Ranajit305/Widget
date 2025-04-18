import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({success: false, message: 'No Token Provided'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        req.user = user;
        next();
    } catch (error) {
        console.log('Error in verifying Token: ', error.message);
    }
}