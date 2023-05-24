import React, { useState } from 'react';
import Login from './Login';
import { schema } from './validation';
import { useDispatch } from 'react-redux';
import { signupDetails } from './action';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsActive(!isActive);
  };

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
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const { error } = schema.extract(name).validate(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error ? error.message : null,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validateAsync(formData, { abortEarly: false });
      dispatch(signupDetails(formData, navigate));
      setFormData({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
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
    <section>
      <div className={`container ${isActive ? 'active' : ''}`}>
        <div className="user signinBx">
          <div className="imgBx">
            <img
              src="https://st.depositphotos.com/1907633/2380/i/600/depositphotos_23805293-stock-photo-medicine-doctor-hand-working-with.jpg"
              alt=""
            />
          </div>
          <div className="formBx">
            <Login toggleForm={toggleForm} />
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <form onSubmit={handleSubmit}>
              <h2>Create an account</h2>
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-danger">{errors.email}</span>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-danger">{errors.phoneNumber}</span>
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-danger">{errors.password}</span>
              <button type="submit">Sign Up</button>
              <p className="signup">
                Already have an account ? <a onClick={toggleForm}>Sign in.</a>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img
              src="https://media.istockphoto.com/id/1156760867/photo/the-doctor-shows-the-icon-of-the-protection-of-health.jpg?s=612x612&w=0&k=20&c=RTLLN4jkjVAUSOixt-vvUMUJvpTRe5OL8raFkwnqZO4="
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
