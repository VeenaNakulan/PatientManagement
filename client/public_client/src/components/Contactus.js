import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { schema } from './validations';
import { createEnquiry } from '../action';

const Contactus = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const { error } = schema.extract(name).validate(value);
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
      await schema.validateAsync(formData, { abortEarly: false });
      dispatch(createEnquiry(formData));
      setFormData({
        name: '',
        email: '',
        message: '',
      });
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
    <div id="contactus">
      <div className="container">
        <div className="row">
          <div className="text-center mb-5 ">
            <h2 className="text-green text-decoration-underline">
              GET IN TOUCH
            </h2>
          </div>
          <div className="col-lg-8 col-md-12 p-5 bg-white rounded-3">
            <div className="d-flex mb-2 flex-column">
              <h1 className="h5 text-capitalize my-4">
                What service You need ?
              </h1>
            </div>
            <form className="row mb-3" onSubmit={handleSubmit}>
              <div className="col-md-12 p-3">
                <input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="text-danger">{errors.name}</span>
                )}
              </div>
              <div className="col-md-12 p-3">
                <input
                  placeholder="E-mail"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
              </div>
              <div className="col-md-12 p-3 mt-3">
                <textarea
                  name="message"
                  placeholder="write your message"
                  cols="30"
                  rows="1"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <span className="text-danger">{errors.message}</span>
                )}
              </div>
              <div className="text-end mt-4">
                <button
                  className="btn px-4 py-3"
                  type="submit"
                  style={{ backgroundColor: '#50550e', color: 'white' }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-md-12 text-white aside px-4 py-5">
            <div className="mb-5">
              <h1 className="h3">Contact Information</h1>
              <p className="opacity-50">
                <small>
                  Fill out the from and we will get back to you whitin 24 hours
                </small>
              </p>
            </div>
            <div className="d-flex flex-column px-0">
              <ul className="m-0 p-0">
                <li className="d-flex justify-content-start align-items-center mb-4">
                  <span className="opacity-50 d-flex align-items-center me-3 fs-2">
                    <i className="fa-solid fa-phone small"></i>
                  </span>
                  <span>+134 1234 1234</span>
                </li>
                <li className="d-flex align-items-center r mb-4">
                  <span className="opacity-50 d-flex align-items-center me-3 fs-2">
                    <i className="fa-solid fa-envelope small"></i>
                  </span>
                  <span>Help@contact.com</span>
                </li>
                <li className="d-flex justify-content-start align-items-center mb-4">
                  <span className="opacity-50 d-flex align-items-center me-3 fs-2">
                    <i className="fa-solid fa-location-dot small"></i>
                  </span>
                  <span>
                    52 Buddy Ln Conway, <br />
                    Arkansas(AR), 72032
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
