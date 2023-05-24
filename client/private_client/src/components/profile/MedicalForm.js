import React, { useEffect, useState } from 'react';
import ProfilePage from './ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDisease,
  getMedicalById,
  medicalCreate,
  updateMedicalData,
} from './action';
import { useNavigate, useParams } from 'react-router-dom';
import { medicalSchema } from './validation';

const MedicalForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    blood: '',
    height: '',
    weight: '',
    gender: '',
    diseaseName: '',
    startedDate: '',
    remarks: '',
  });

  const [errors, setErrors] = useState({});
  const { diseases, medicalDataByid } = useSelector(
    (state) => state.profileReducer
  );

  const dateString = medicalDataByid?.startedDate;
  const dateObject = new Date(dateString);
  let formattedDate =
    medicalDataByid?.startedDate !== undefined
      ? dateObject?.toISOString().split('T')[0]
      : null;

  useEffect(() => {
    dispatch(getDisease());
    if (id) {
      dispatch(getMedicalById(id));
    }
  }, []);

  useEffect(() => {
    if (medicalDataByid) {
      setFormData({
        ...formData,
        blood: id ? medicalDataByid?.blood : '',
        height: id ? medicalDataByid?.height : '',
        weight: id ? medicalDataByid?.weight : '',
        gender: id ? medicalDataByid?.gender : '',
        diseaseName: id ? medicalDataByid?.diseaseName : '',
        startedDate: id ? formattedDate : '',
        remarks: id ? medicalDataByid?.remarks : '',
      });
    }
  }, [medicalDataByid]);

  const validateField = (name, value) => {
    const { error } = medicalSchema.extract(name).validate(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error ? error.message : null,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await medicalSchema.validateAsync(formData, { abortEarly: false });
      if (id) {
        dispatch(updateMedicalData(id, formData, navigate));
      } else {
        dispatch(medicalCreate(formData, navigate));
      }
    } catch (error) {
      if (error.details) {
        const validationErrors = error.details.reduce(
          (acc, { context, message }) => ({ ...acc, [context.label]: message }),
          {}
        );
        setErrors(validationErrors);
      }
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container d-flex flex-wrap">
      <div>
        <ProfilePage />
      </div>
      <div className="wrapper">
        <div className="registration_form">
          <form onSubmit={handleSubmit}>
            <div className="form_wrap">
              <div className="text-center mb-4">
                <h3>Medical Details</h3>
              </div>
              <div className="input_wrap">
                <label>Blood</label>
                <select
                  name="blood"
                  value={formData.blood}
                  onChange={handleChange}
                >
                  <option>--select--</option>
                  <option>A+</option>
                  <option>B+</option>
                  <option>AB+</option>
                  <option>O+</option>
                  <option>A-</option>
                  <option>B-</option>
                  <option>AB-</option>
                  <option>O-</option>
                </select>
                {errors.blood && (
                  <span className="text-danger">{errors.blood}</span>
                )}
              </div>
              <div className="input_wrap">
                <label>Height</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
                {errors.height && (
                  <span className="text-danger">{errors.height}</span>
                )}
              </div>
              <div className="input_wrap">
                <label>Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
                {errors.weight && (
                  <span className="text-danger">{errors.weight}</span>
                )}
              </div>
              <div className="input_wrap">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option>--select--</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
                {errors.gender && (
                  <span className="text-danger">{errors.gender}</span>
                )}
              </div>
              <div className="input_grp d-flex flex-wrap justify-content-between">
                <div className="input_wrap">
                  <label>Diseases</label>
                  <select
                    name="diseaseName"
                    value={formData.diseaseName}
                    onChange={handleChange}
                  >
                    <option>--select--</option>
                    {diseases?.map((d, index) => {
                      return (
                        <option key={index} value={d._id}>
                          {d.diseaseName}
                        </option>
                      );
                    })}
                  </select>
                  {errors.diseaseName && (
                    <span className="text-danger">{errors.diseaseName}</span>
                  )}
                </div>
                <div className="input_wrap">
                  <label>Start date</label>
                  <input
                    type="date"
                    name="startedDate"
                    value={formData.startedDate}
                    onChange={handleChange}
                    max={today}
                  />
                  {errors.startedDate && (
                    <span className="text-danger">{errors.startedDate}</span>
                  )}
                </div>
                <div className="input_wrap">
                  <label>Remarks</label>
                  <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                  />
                  {errors.remarks && (
                    <span className="text-danger">{errors.remarks}</span>
                  )}
                </div>
              </div>
              <div className="input_wrap">
                <button
                  type="submit"
                  className="btn btn-sm  w-full w-lg-auto mt-4 p-2"
                  style={{
                    backgroundColor: '#6d7119',
                    color: 'white',
                    width: '100%',
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicalForm;
