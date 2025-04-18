import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie('jwt', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== "development"
        })

        return token;
    } catch (error) {
        console.log("Error in Token Generation: ", error.message);
    }
}