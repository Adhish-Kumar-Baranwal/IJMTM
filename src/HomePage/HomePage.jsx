import Hero from "../components/Hero/Hero";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../Footer/Footer";
import LatestArticles from "../components/sections/LatestArticles/LatestArticles"

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <LatestArticles />
    </>
  );
};
export default HomePage;
