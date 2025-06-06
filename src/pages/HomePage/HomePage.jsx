import Hero from "../../components/sections/Hero/Hero";
import LatestArticles from "../../components/sections/LatestArticles/LatestArticles";
import AboutJournal from "../../components/sections/AboutJournal/AboutJournal";
import InfoCards from "../../components/sections/InfoCards/InfoCards";

const HomePage = () => {
  return (
    <>
      <Hero />
      <LatestArticles />
      <InfoCards />
      <AboutJournal />
    </>
  );
};
export default HomePage;
