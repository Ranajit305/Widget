import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    companies: [
        {
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Company'
            },
            status: {
                type: String,
                enum: ['Target', 'Not Target'],
                default: null
            }
        }
    ]
    
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User