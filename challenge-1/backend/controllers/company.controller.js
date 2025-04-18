import Company from '../models/company.model.js'
import User from '../models/user.model.js'

export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({});
        res.status(200).json({success: true, companies});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const updateStatus = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { status } = req.body;

        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({success: false, message: 'Company not Found'});
        }

        if (!status && status !== 'Target' && status !== 'Not Target') {
            return res.status(400).json({success: false, message: 'Invalid Status'});
        }

        const companyIndex = user.companies.findIndex(
            item => item.company.toString() === id
        );

        if (companyIndex !== -1) {
            user.companies[companyIndex].status = status;
        } else {
            user.companies.push({
                company: id,
                status: status
            });
        }
        await user.save();
        res.status(200).json({ success: true, message: 'Company status updated!' });
     } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}