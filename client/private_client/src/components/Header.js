import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './signup/action';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getprofile } from './profile/action';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { isLogin, role } = useSelector((state) => state.loginReducer);
  const { profiledetails } = useSelector((state) => state.profileReducer);

  useEffect(() => {
    dispatch(getprofile());
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };
  return (
    <header className="headers">
      <div className="container"></div>
      <div className="logo">
        <strong>M</strong>ediserve
      </div>
      <div
        className={`mean-toggle ${isMenuActive ? 'active' : ''}`}
        onClick={toggleMenu}
      ></div>
      <nav className={isMenuActive ? 'active' : ''}>
        {isLogin ? (
          role?.role === 'Admin' ? (
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/enquiry">Enquiry</Link>
              </li>
              <li>
                <Link to="/admin-consultation">Consultaion</Link>
              </li>
              <li>
                <Link to="/admin-vaccination">Vaccination</Link>
              </li>
              <li>
                <Link to="/transaction">Payments</Link>
              </li>
              <li>
                <Link to="/patient">Patients</Link>
              </li>
              <li>
                <Link to="/change-password">Change Password</Link>
              </li>
              <li className="mt-2 ms-2">
                <a
                  className="btn btn-sm  w-full w-lg-auto"
                  style={{
                    backgroundColor: '#6d7119',
                    color: 'white',
                    width: '80px',
                  }}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to={`/profile/${profiledetails?._id}`}>
                  Update Profile
                </Link>
              </li>
              <li>
                <Link to="/consultation">Consultaion</Link>
              </li>
              <li>
                <Link to="/vaccination">Vaccination</Link>
              </li>
              <li>
                <Link to="/certificate">Certificates</Link>
              </li>
              <li>
                <Link to="/change-password">Change Password</Link>
              </li>
              <li className="mt-2 ms-2">
                <a
                  className="btn btn-sm  w-full w-lg-auto"
                  style={{
                    backgroundColor: '#6d7119',
                    color: 'white',
                    width: '80px',
                  }}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </a>
              </li>
            </ul>
          )
        ) : !isLogin ? (
          <>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Testimonial</a>
              </li>
              <li>
                <a href="#">Certificate</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li className="mt-2 ms-2">
                <a
                  className="btn btn-sm  w-full w-lg-auto"
                  style={{
                    backgroundColor: '#6d7119',
                    color: 'white',
                    width: '80px',
                  }}
                  href="http://localhost:3001/login"
                >
                  Login
                </a>
              </li>
            </ul>
          </>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
