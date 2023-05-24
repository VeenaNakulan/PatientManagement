const { default: mongoose } = require('mongoose');
const {
  errorMessage,
  successMessage,
  postData,
} = require('../../helpers/commonFunctions');
const hospital = require('../../model/hospital');
const department = require('../../model/department');
const doctor = require('../../model/doctor');
const time = require('../../model/time');
const consultation = require('../../model/consultation');

module.exports = {
  getHostptal: async (req, res, next) => {
    try {
      const hospitalData = await hospital.find();
      const departmentData = await department.find();
      const doctorData = await doctor.find();
      return successMessage(res, { hospitalData, departmentData, doctorData });
    } catch (err) {
      return errorMessage(res, err);
    }
  },
  correspondingData: async (req, res) => {
    try {
      let hospitalData = await hospital.find({
        hospitalId: req.body.hospital,
      });
      let departmentData = await department.find({
        departmentId: req.body.department,
      });
      let doctorData = await doctor.find({
        hospitalId: hospitalData[0].hospitalId,
        departmentId: departmentData[0].departmentId,
      });
      return successMessage(res, { hospitalData, departmentData, doctorData });
    } catch (e) {
      errorMessage(res, e);
    }
  },

  getTimeData: async (req, res) => {
    try {
      const timeData = await time.find();
      const { date, doctorId } = req.body;

      const selectedDate = new Date(date);
      const selectedDateStart = new Date(selectedDate);
      selectedDateStart.setHours(0, 0, 0, 0);

      const selectedDateEnd = new Date(selectedDate);
      selectedDateEnd.setHours(23, 59, 59, 999);

      const bookingData = await consultation.find({
        date: {
          $gte: selectedDateStart,
          $lte: selectedDateEnd,
        },
        doctorId,
      });

      // console.log(timeData);

      if (bookingData.length < 1) {
        successMessage(res, timeData);
      } else {
        const bookedTime = bookingData.map((e) => e.time);
        const filteredTime = timeData.filter(
          (e) => !bookedTime.includes(e.time)
        );
        successMessage(res, filteredTime);
      }
    } catch (err) {
      return errorMessage(res, err);
    }
  },
};
