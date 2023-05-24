const { initiateTask, startTask } = require('./cron/index');
const Vaccination = require('../model/vaccination');

const changeVaccinationStatus = initiateTask('*/5 * * * * *', async () => {
  try {
    const currentTime = new Date();

    const allVaccinations = await Vaccination.find({
      status: 'not-taken',
      date: { $lte: currentTime },
    });

    for (const vaccination of allVaccinations) {
      const endTime = calculateEndTime(vaccination.date);

      if (currentTime >= endTime) {
        await Vaccination.updateOne(
          { _id: vaccination._id },
          { status: 'taken' }
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
});
function calculateEndTime(startDate) {
  const endTime = new Date(startDate);
  endTime.setHours(endTime.getHours() + 1, 0, 0, 0);

  // Convert the hours to 24-hour format if needed
  let hour = endTime.getHours();
  if (hour > 12) {
    hour -= 12;
  }

  return endTime;
}

// function calculateEndTime(startDate) {
//   const endTime = new Date(startDate);
//   endTime.setHours(endTime.getHours() + 1, 0, 0, 0);
//   return endTime;
// }

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeVaccinationStatus, 'changeVaccinationStatus');
}
