import React, { useEffect } from 'react';
import '../profile/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getpatientscounts } from '../admin_part/vaccination/action';

const Admindashboard = () => {
  const dispatch = useDispatch();
  const { counts } = useSelector((state) => state.adminReducer);
  // console.log(counts);

  useEffect(() => {
    dispatch(getpatientscounts());
  }, []);

  return (
    <div className="counterss mt-5">
      <div className="container p-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
          <div className="col-md-4">
            <div className="card radius-10 border-start border-0 border-3 border-info">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Patients</p>
                    <h4 className="my-1 text-green">{counts?.patientCount}</h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                    <i className="fa fa-shopping-cart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card radius-10 border-start border-0 border-3 border-info">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Consultations</p>
                    <h4 className="my-1 text-green">
                      {counts?.consultationCount}
                    </h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                    <i className="fa fa-dollar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card radius-10 border-start border-0 border-3 border-info">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Vaccination</p>
                    <h4 className="my-1 text-green">
                      {counts?.vaccinationCount}
                    </h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                    <i className="fa fa-bar-chart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card radius-10 border-start border-0 border-3 border-info">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Certificates</p>
                    <h4 className="my-1 text-green">8</h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto">
                    <i className="fa fa-users"></i>
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

export default Admindashboard;
