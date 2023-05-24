import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from './ProfilePage';
import { useEffect, useState } from 'react';
import { getProfileById, updateProfileData } from './action';
import { useNavigate, useParams } from 'react-router-dom';
import { profileSchema } from './validation';
import UserConsultation from '../consultation/UserConsultation';
import UserVaccinedata from '../vaccination/UserVaccinedata';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    aadharNo: '',
    dob: '',
    address: '',
    country: '',
    state: '',
    pinCode: '',
  });
  const [errors, setErrors] = useState({});
  const { updateProfile } = useSelector((state) => state.profileReducer);

  const dateString = updateProfile?.dob;
  const dateObject = new Date(dateString);
  let formattedDate =
    updateProfile?.dob !== undefined
      ? dateObject?.toISOString().split('T')[0]
      : null;

  useEffect(() => {
    if (id) {
      dispatch(getProfileById(id));
    }
  }, []);

  useEffect(() => {
    if (updateProfile) {
      setFormData({
        ...formData,
        name: id ? updateProfile?.name : '',
        email: id ? updateProfile?.loginId?.email : '',
        phoneNumber: id ? updateProfile?.phoneNumber : '',
        aadharNo: id ? updateProfile.aadharNo : '',
        dob: id ? formattedDate : '',
        address: id ? updateProfile?.address : '',
        country: id ? updateProfile?.country : '',
        state: id ? updateProfile?.state : '',
        pinCode: id ? updateProfile?.pinCode : '',
      });
    }
  }, [updateProfile]);

  const validateField = (name, value) => {
    const { error } = profileSchema.extract(name).validate(value);
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
      await profileSchema.validateAsync(formData, { abortEarly: false });
      if (id) {
        dispatch(updateProfileData(id, formData, navigate));
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

  return (
    <div>
      <div className="container d-flex flex-wrap">
        <div>
          <ProfilePage />
        </div>
        <div className="wrapper">
          <div className="registration_form">
            <form onSubmit={handleSubmit}>
              <div className="form_wrap">
                <div className="text-center mb-4">
                  <h3>Basic Details</h3>
                </div>
                <div className="input_wrap">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </div>
                <div className="input_wrap">
                  <label>email Address</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={id}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                <div className="input_wrap">
                  <label>Aadhar Number</label>
                  <input
                    type="text"
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleChange}
                  />
                  {errors.aadharNo && (
                    <span className="text-danger">{errors.aadharNo}</span>
                  )}
                </div>
                <div className="input_wrap">
                  <label>Date of birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && (
                    <span className="text-danger">{errors.dob}</span>
                  )}
                </div>
                <div className="input_wrap">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <span className="text-danger">{errors.address}</span>
                  )}
                </div>
                <div className="input_grp d-flex flex-wrap justify-content-between">
                  <div className="input_wrap">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    {errors.state && (
                      <span className="text-danger">{errors.state}</span>
                    )}
                  </div>
                  <div className="input_wrap">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                    {errors.country && (
                      <span className="text-danger">{errors.country}</span>
                    )}
                  </div>
                  <div className="input_wrap">
                    <label>PIN Code</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                    />
                    {errors.pinCode && (
                      <span className="text-danger">{errors.pinCode}</span>
                    )}
                  </div>
                </div>
                <div className="input_wrap">
                  <button
                    className="btn btn-sm  w-full w-lg-auto mt-4 p-2"
                    style={{
                      backgroundColor: '#6d7119',
                      color: 'white',
                      width: '100%',
                    }}
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container mt-5 m-auto">
        <div className="row">
          <div className="col-md-4 col-lg-6 p-5 userProfile mb-3">
            <UserConsultation />
          </div>
          <div className="col-md-4 col-lg-6 p-5 mb-3 userProfile mb-3">
            <UserVaccinedata />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
