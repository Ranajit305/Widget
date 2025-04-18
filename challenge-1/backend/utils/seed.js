import mongoose from "mongoose";
import 'dotenv/config'
import Company from "../models/company.model.js";

// Dummy companies data
const companiesData = [
    { name: 'TechCorp', score: '85' },
    { name: 'HealthPlus', score: '78' },
    { name: 'EcoDrive', score: '92' },
    { name: 'FinWise', score: '80' },
    { name: 'GreenScape', score: '88' },
    { name: 'SafeNet', score: '75' },
    { name: 'QuickCart', score: '81' },
    { name: 'AquaPure', score: '79' },
    { name: 'EduSphere', score: '83' },
    { name: 'FoodiesHub', score: '77' }
  ];
  
  // Connection and seeding
  const seedCompanies = async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB_URI);
      console.log('MongoDB connected.');
  
      await Company.deleteMany(); // Clean existing
      await Company.insertMany(companiesData); // Insert new
      console.log('Dummy companies inserted successfully!');
  
      mongoose.disconnect();
    } catch (error) {
      console.error('Error while seeding:', error.message);
      mongoose.disconnect();
    }
  };
  
  seedCompanies();