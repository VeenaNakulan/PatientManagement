import React, { useEffect } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCounts } from './action';

const Counter = () => {
  const dispatch = useDispatch();
  const { pcounts } = useSelector((state) => state.profileReducer);
  console.log(pcounts);
  useEffect(() => {
    dispatch(getCounts());
  }, []);
  return (
    <div className="counterss">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
          <div className="col-md-4">
            <div className="card radius-10 border-start border-0 border-3 border-info">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">
                      Consultation Certificates
                    </p>
                    <h4 className="my-1 text-green">
                      {pcounts.countConsultCert}
                    </h4>
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
                    <p className="mb-0 text-secondary">
                      Vaccination Certificates
                    </p>
                    <h4 className="my-1 text-green">
                      {pcounts.countVaccineCert}
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
                    <p className="mb-0 text-secondary">Vaccinations</p>
                    <h4 className="my-1 text-green">{pcounts.countVaccine}</h4>
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
                    <p className="mb-0 text-secondary">Consults</p>
                    <h4 className="my-1 text-green">{pcounts.countConsult}</h4>
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

export default Counter;
