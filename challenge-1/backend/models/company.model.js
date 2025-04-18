import mongoose from "mongoose"

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    score: {
        type: String,
        required: true
    }
});

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);
export default Company