import React from 'react';

const Banner = () => {
  return (
    <section id="banner">
      <div className="bannerImage"></div>
      <div className="image-text text-center">
        <h3>Let's make your life happier</h3>
        <h1>Healthy Living</h1>
        <a
          className="btn mt-3"
          style={{ backgroundColor: '#50550e', color: 'white' }}
          type="submit"
          href="http://localhost:3001/login"
        >
          Register
        </a>
      </div>
    </section>
  );
};

export default Banner;
