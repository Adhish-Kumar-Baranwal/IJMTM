import Hero from "../components/Hero/Hero";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../Footer/Footer";
import LatestArticles from "../components/sections/LatestArticles/LatestArticles";
import AboutJournal from "../components/sections/AboutJournal/AboutJournal";
import Notifications from "../components/sections/NotificationsBell/Notifications"
import InfoCards from "../components/sections/InfoCards/InfoCards"

const HomePage = () => {
  return (
    <>
      <NavBar />
      {/* <Notifications /> */}
      <Hero />
      <LatestArticles />
      <InfoCards />
      <AboutJournal />
    </>
  );
};
export default HomePage;
