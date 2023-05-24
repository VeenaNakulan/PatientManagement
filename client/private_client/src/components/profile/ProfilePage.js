import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMedical, getprofile } from './action';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { profiledetails, medicalData } = useSelector(
    (state) => state.profileReducer
  );

  useEffect(() => {
    dispatch(getprofile());
    dispatch(getMedical());
  }, []);

  return (
    <div className="container">
      <div className="card-side" style={{ width: '18rem' }}>
        <img
          src="https://www.eirim.ie/eirim2017/wp-content/uploads/2016/09/dummy-profile-pic.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body mb-5">
          <h5 className="card-title mt-2">{profiledetails?.name}</h5>
          <p className="card-text">
            {profiledetails?.loginId?.email}
            <br />
            {profiledetails?.phoneNumber}
            <br />
            {medicalData?.gender}
          </p>
          <Link
            to={`/profile/${profiledetails?._id}`}
            className="btn btn-outline-success"
          >
            Basic details
          </Link>
          <Link
            to={`/medicaldetails/${medicalData?._id ? medicalData?._id : ''}`}
            className="btn btn-outline-success ms-2"
          >
            Medical details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
