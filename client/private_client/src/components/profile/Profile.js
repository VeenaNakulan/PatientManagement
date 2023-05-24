import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getprofile } from './action';

const Profile = () => {
  const dispatch = useDispatch();

  const { profiledetails, medicalData } = useSelector(
    (state) => state.profileReducer
  );
  useEffect(() => {
    dispatch(getprofile());
  }, []);

  return (
    <div>
      <div className="container py-5 ">
        <div className="row d-flex justify-content-center align-items-center p-3">
          <div className="col col-md-12 col-lg-10 col-xl-8">
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <img
                      src="https://www.eirim.ie/eirim2017/wp-content/uploads/2016/09/dummy-profile-pic.jpg"
                      alt="Profile image"
                      className="img-fluid"
                      style={{ width: '150px', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-1">{profiledetails?.name}</h5>
                    <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                      {profiledetails?.loginId?.email}
                      <br />
                      {profiledetails?.phoneNumber}
                      <br />
                      {medicalData?.gender}
                    </p>
                    <div className="d-flex pt-1">
                      <button
                        type="button"
                        className="btn btn-outline-success me-1 flex-grow-1"
                      >
                        View More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
