import About from './About';
import Banner from './Banner';
import Contactus from './Contactus';
import Certificate from './Certificate';
import Service from './Service';
import Footer from './Footer';

const Homepage = () => {
  return (
    <div>
      <Banner />
      <About />
      <Service />
      <Certificate />
      <Contactus />
      <Footer />
    </div>
  );
};

export default Homepage;
