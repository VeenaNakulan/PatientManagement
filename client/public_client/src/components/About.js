import React from 'react';

const About = () => {
  return (
    <div id="about">
      <div className="row m-auto aboutus container">
        <div className="text-center mb-5">
          <h2 className="text-green text-decoration-underline">ABOUT US</h2>
        </div>
        <div className="col-md-6 about-h">
          <img
            src="https://www.pngitem.com/pimgs/m/491-4912822_doctors-and-nurses-png-image-nurses-and-doctors.png"
            width="90%"
            height="100%"
          />
        </div>
        <div className="about-h col-md-6">
          <div className="">
            <h1>Welcome to Your Mediserve</h1>
            <p className="mt-3 text-size">
              At Mediserve, we are dedicated to providing high-quality
              healthcare services to our community. With a team of experienced
              doctors, nurses, and staff, we strive to deliver comprehensive and
              compassionate care to our patients.
            </p>
            <p className=" text-size">
              Our healthcare center is equipped with state-of-the-art facilities
              and advanced medical technology to ensure accurate diagnoses and
              effective treatments.
            </p>
            <p className=" text-size">
              Our mission is to improve the health and well-being of our
              patients by delivering personalized healthcare services in a
              comfortable and supportive environment. We prioritize patient
              safety, confidentiality, and satisfaction in all aspects of our
              practice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
