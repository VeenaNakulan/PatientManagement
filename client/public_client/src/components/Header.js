import React, { useState } from 'react';

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

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
        <ul>
          <li>
            <a href="#banner">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#service">Services</a>
          </li>
          <li>
            <a href="#">Testimonial</a>
          </li>
          <li>
            <a href="#certificate">Certificate</a>
          </li>
          <li>
            <a href="#contactus">Contact Us</a>
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
      </nav>
      <div className="clear"></div>
    </header>
  );
};

export default Header;

// import React from 'react';

// const Header = () => {
//   return (
//     <div id="header">
//       <div className="container">
//         <nav className="navbar navbar-expand-lg navbar-dark">
//           <div className="navbar-brand d-block d-lg-none">
//             <h2 className="logo">
//               <strong>M</strong>ediserve
//             </h2>
//           </div>
//           <button
//             className="navbar-toggler navbar_toggle"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="navbar-brand d-none d-lg-block" href="#">
//             <h2 className="logo center-logo">
//               <strong>M</strong>ediserve
//             </h2>
//           </div>
//           <div
//             className="collapse navbar-collapse mt-2"
//             id="navbarSupportedContent"
//           >
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="#banner">
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#about">
//                   About Us
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#service">
//                   Services
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   Testimonial
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#certificate">
//                   Certificates
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#contactus">
//                   Contact Us
//                 </a>
//               </li>
//               <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
//                 <a
//                   className="btn btn-sm  w-full w-lg-auto"
//                   style={{
//                     backgroundColor: '#6d7119',
//                     color: 'white',
//                     width: '80px',
//                   }}
//                   href="http://localhost:3001"
//                 >
//                   Login
//                 </a>
//               </div>
//             </ul>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Header;
