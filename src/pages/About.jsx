import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Content from "./About/Content";
import Hero from "./About/Hero"
import Mission from "./About/Mission";

const About = () => {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <Mission />
                <Content />
            </main>

            <Footer />
        </div>

    )
}
export default About;