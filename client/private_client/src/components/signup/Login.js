import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginDetails } from './action';
import { useNavigate } from 'react-router-dom';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4).max(10).required('Required'),
});

const Login = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          dispatch(loginDetails(values, navigate));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && (
              <span className="text-danger">{errors.email}</span>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <span className="text-danger">{errors.password}</span>
            )}
            <button type="submit">Login</button>
            <p className="signup">
              Don't have an account ? <a onClick={toggleForm}>Sign Up.</a>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
