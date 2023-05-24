const time = require('../time');
require('dotenv').config();
const { connection, connect, set } = require('mongoose');
set('strictQuery', false);

connect(
  'mongodb+srv://veena:Ammu3633@veenadatabase.uraygxd.mongodb.net/PatientManagement',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const createSeedData = async (req, res) => {
  try {
    const timeData = [
      { time: '9.00am' },
      { time: '10.00am' },
      { time: '11.00am' },
      { time: '12.00pm' },
      { time: '2.00pm' },
      { time: '3.00pm' },
      { time: '4.00pm' },
      { time: '5.00pm' },
    ];
    const existingDoc = await time.find();
    if (existingDoc >= 0) {
      await time.insertMany(timeData);
      console.log(`Data created successfully`);
    } else {
      console.log(`Data already exists`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    connection.close();
  }
};

createSeedData();
