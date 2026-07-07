
import HeroSection from '../components/home/HeroSection';
import BrandsSection from '../components/home/BrandsSection';
import TechnicianSection from '../components/home/TechnicianSection';
import ShowcaseSection from '../components/home/ShowcaseSection';
import ReviewsSection from '../components/home/ReviewsSection';

const Home = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <HeroSection />
      <hr className="border-t border-border" />
      <BrandsSection />
      <hr className="border-t border-border" />
      <TechnicianSection />
      <hr className="border-t border-border" />
      <ShowcaseSection />
      <hr className="border-t border-border" />
      <ReviewsSection />
    </div>
  );
};

export default Home;