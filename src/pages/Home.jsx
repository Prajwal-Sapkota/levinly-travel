import About from "../components/About";
import Choose from "../components/Choose";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import LatestBlogs from "../components/LatestBlogs";
import Navbar from "../components/Navbar"
import Popular from "../components/Popular";
import Tours from "../components/Tours";
import Trekking from "../components/Trekking";
import Video from "../components/Video";
import VideoGallery from "../components/VideoGallery";

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <Tours />
                <About />
                <Trekking />
                <Video />
                <Popular />
                <Choose />
                <VideoGallery />
                <LatestBlogs />
            </main>
            <Footer />
        </div>
    )
}
export default Home;