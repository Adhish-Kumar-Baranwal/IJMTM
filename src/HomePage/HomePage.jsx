import Hero from "../components/Hero/Hero";
import NavBar from "../components/NavBar/NavBar";
import FeaturedAuthor from "../components/sections/Featured/FeaturedAuthor";
import FeaturedArticles from "../components/sections/Featured/FeaturedArticles";
import CounterSection from "../components/sections/CounterSection/CounterSection"
import Footer from "../Footer/Footer";

const HomePage = () => {
    return (
    <>
        <NavBar />
        <Hero />
        <CounterSection />
        <FeaturedAuthor />
        <FeaturedArticles />
        <Footer />
    </>
    );
}
export default HomePage;