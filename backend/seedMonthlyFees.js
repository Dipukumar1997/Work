import mongoose from 'mongoose';
import FeeStructure from './models/FeeStructure.js';

mongoose.connect('mongodb://localhost:27017/backend');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

const classFees = {
  '6': 5000,
  '7': 5500,
  '8': 6000,
  '9': 6500,
  '10': 7000,
  '11': 8000,
  '12': 9000
};

async function seedMonthlyFees() {
  try {
    await FeeStructure.deleteMany({});
    console.log('Deleted old fee structures');

    const fees = [];

    // Generate fees for each class and month
    for (const [className, amount] of Object.entries(classFees)) {
      for (const month of months) {
        fees.push({
          class: className,
          month: month,
          feeType: 'Monthly Tuition Fee',
          amount: amount,
          academicYear: '2024-2025',
          isActive: true
        });
      }
    }

    await FeeStructure.insertMany(fees);
    console.log(`✅ Successfully seeded ${fees.length} monthly fee structures!`);
    console.log(`Classes: 6-12, Months: January-December`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding fees:', error);
    process.exit(1);
  }
}

seedMonthlyFees();
