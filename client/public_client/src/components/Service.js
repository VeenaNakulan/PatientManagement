import React from 'react';

const Service = () => {
  return (
    <div className="service mb-5 mt-5 p-5" id="service">
      <div className="container">
        <div className="row">
          <div className="text-center mb-5 ">
            <h2 className="text-green text-decoration-underline">
              OUR SERVICES
            </h2>
          </div>
          <div className="col-xs-12 col-sm-3">
            <div className="card">
              <img
                className="img-card"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxOzf_sOIunYiPiXtmhlNoeu6dBlyW4yV81o7eqBnPCHYo2SbM0T9-6Pn8NErOqzs54dY&usqp=CAU"
              />
              <div className="card-content ">
                <h5 className="card-title">Primary Care</h5>
                <p className="text-size">
                  We provide comprehensive primary care services for patients of
                  all ages, including routine check-ups and preventive care.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-3">
            <div className="card">
              <img
                className="img-card"
                src="https://www.shutterstock.com/image-vector/chiropractic-physiotherapy-logo-design-creative-260nw-1568039872.jpg"
              />
              <div className="card-content">
                <h5 className="card-title">Maternity Care</h5>
                <p className="text-size">
                  Our team of obstetricians and gynecologists provide
                  comprehensive prenatal, delivery to support expectant mothers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-3">
            <div className="card">
              <img
                className="img-card"
                src="https://i.pinimg.com/originals/61/4d/b4/614db4b86e2c9e30dc6fd8d5750ed5fd.png"
              />
              <div className="card-content">
                <h5 className="card-title">Emergency Care</h5>
                <p className="text-size">
                  Our 24/7 emergency department is equipped to handle all types
                  of medical emergencies with utmost urgency and care.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-3">
            <div className="card">
              <img
                className="img-card"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/cw5pelgwj7uazdwkjhxp"
              />
              <div className="card-content">
                <h5 className="card-title">Specialty Care</h5>
                <p className="text-size">
                  Our team of specialists offers expert care in various areas,
                  such as cardiology, orthopedics, dermatology, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
