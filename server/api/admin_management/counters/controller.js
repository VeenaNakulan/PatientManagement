const signup = require('../../../model/signup');
const {
  successMessage,
  errorMessage,
} = require('../../../helpers/commonFunctions');
const consultation = require('../../../model/consultation');
const vaccination = require('../../../model/vaccination');
const certificateConsult = require('../../../model/ConsultationCert');
const vaccineCert = require('../../../model/vaccineCertificate');

module.exports = {
  getPatients: async (req, res) => {
    try {
      // patient count
      let data = await signup
        .find({ role: 'Patient' })
        .populate('loginId', 'email');
      let patientCount = data.length;
      // consultation count
      let consul = await consultation.find();
      let consultationCount = consul.length;
      // vaccination count
      let vaccinationData = await vaccination.find();
      let vaccinationCount = vaccinationData.length;

      return successMessage(res, {
        patientCount,
        consultationCount,
        vaccinationCount,
      });
    } catch (error) {
      return errorMessage(res, error);
    }
  },
  getCountsForPatientDashboard: async (req, res) => {
    try {
      const eachConsultPromise = consultation
        .find({ loginId: req.user.id })
        .exec();
      const eachVaccinePromise = vaccination
        .find({ loginId: req.user.id })
        .exec();
      const eachConsultCertPromise = certificateConsult
        .find({ patientRegId: req.user.id })
        .exec();
      const eachVaccineCertPromise = vaccineCert
        .find({ patientRegId: req.user.id })
        .exec();

      const [eachConsult, eachVaccine, eachConsultCert, eachVaccineCert] =
        await Promise.all([
          eachConsultPromise,
          eachVaccinePromise,
          eachConsultCertPromise,
          eachVaccineCertPromise,
        ]);

      const countConsult = eachConsult.length;
      const countVaccine = eachVaccine.length;
      const countConsultCert = eachConsultCert.length;
      const countVaccineCert = eachVaccineCert.length;

      console.log(countConsult);

      successMessage(res, {
        countConsult,
        countVaccine,
        countConsultCert,
        countVaccineCert,
      });
    } catch (e) {
      console.error(e);
      errorMessage(res, e);
    }
  },
};
