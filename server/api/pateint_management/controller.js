const { default: mongoose } = require('mongoose');
const {
  errorMessage,
  successMessage,
  postData,
} = require('../../helpers/commonFunctions');
const disease = require('../../model/disease');
const signup = require('../../model/signup');
const medical = require('../../model/medicalDetails');
const ConsultationCertificate = require('../../model/ConsultationCert');
const VaccineCertificate = require('../../model/vaccineCertificate');

module.exports = {
  getProfiles: async (req, res, next) => {
    try {
      const userData = req.user;
      let profileData = await signup
        .findOne({ loginId: userData.id })
        .populate('loginId', 'email');
      return successMessage(res, profileData);
    } catch (err) {
      return errorMessage(res, err);
    }
  },
  getDiseases: async (req, res, next) => {
    try {
      const data = await disease.find();
      return successMessage(res, data);
    } catch (err) {
      return errorMessage(res, err);
    }
  },
  profileGetById: async (req, res) => {
    try {
      const signupData = await signup
        .findOne({ _id: req.params.id })
        .populate('loginId', 'email');
      return successMessage(res, signupData);
    } catch (err) {
      return errorMessage(res, err);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const signupData = await signup
        .findOne({ _id: req.params.id })
        .populate('loginId', 'email');

      if (!signupData) {
        return errorMessage(res, 'User does not exist');
      }
      req.body.email = undefined;
      await signupData.updateOne(req.body);

      successMessage(res, 'Update successfully');
    } catch (err) {
      return errorMessage(res, err);
    }
  },

  getMedical: async (req, res, next) => {
    try {
      let medicalData = await medical.findOne({ loginId: req.user.id });
      return successMessage(res, medicalData);
    } catch (err) {
      return errorMessage(res, err);
    }
  },

  medicalData: async (req, res) => {
    try {
      await postData(medical, { ...req.body, loginId: req.user.id });
      return successMessage(res, 'Added successfully');
    } catch (e) {
      return errorMessage(res, e);
    }
  },

  medicalGetById: async (req, res) => {
    try {
      const medicalData = await medical.findOne({ _id: req.params.id });
      return successMessage(res, medicalData);
    } catch (err) {
      return errorMessage(res, err);
    }
  },
  updateMedical: async (req, res, next) => {
    try {
      const medicalData = await medical.findOne({ _id: req.params.id });
      if (!medicalData) {
        return errorMessage(res, 'Medical data does not exist');
      }
      await medicalData.updateOne(req.body);
      successMessage(res, 'Update successfully');
    } catch (err) {
      return errorMessage(res, err);
    }
  },
  getCerticicates: async (req, res) => {
    try {
      const consultData = await ConsultationCertificate.find({
        patientRegId: req.user.id,
      });
      const vaccinData = await VaccineCertificate.find({
        patientRegId: req.user.id,
      });
      return successMessage(res, { consultData, vaccinData });
    } catch (err) {
      errorMessage(res, err);
    }
  },
};
