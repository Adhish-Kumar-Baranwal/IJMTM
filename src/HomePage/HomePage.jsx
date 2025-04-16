import Hero from "../components/Hero/Hero";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../Footer/Footer";
import LatestArticles from "../components/sections/LatestArticles/LatestArticles"
import AboutJournal from "../components/sections/AboutJournal/AboutJournal"

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <LatestArticles />
      <AboutJournal />
    </>
  );
};
export default HomePage;
