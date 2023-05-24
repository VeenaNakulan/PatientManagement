const { initiateTask, startTask } = require('./cron/index');
const Consultation = require('../model/consultation');

const changeConsultationStatus = initiateTask('*/5 * * * * *', async () => {
  try {
    const allConsultations = await Consultation.find({
      status: 'pending',
      date: { $lte: new Date() }, // Filter consultations where the date is less than or equal to the current date
    });
    const currentTime = new Date();

    for (const consultation of allConsultations) {
      const endTime = calculateEndTime(consultation.time);

      if (currentTime >= endTime) {
        await Consultation.updateOne(
          { _id: consultation._id },
          { status: 'consulted' }
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
});

function calculateEndTime(startTime) {
  const [hour, minute, meridiem] = startTime
    .match(/^(\d+).(\d+)(\w+)/)
    .slice(1);
  let hourValue = parseInt(hour, 10);
  const isPM = meridiem?.toLowerCase() === 'pm';

  if (isPM && hourValue !== 12) {
    hourValue += 12;
  } else if (!isPM && hourValue === 12) {
    hourValue = 0;
  }

  const endTime = new Date();
  endTime.setHours(hourValue + 1, minute || 0, 0);
  return endTime;
}

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeConsultationStatus, 'changeConsultationStatus');
}
