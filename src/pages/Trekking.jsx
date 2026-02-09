import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "./Trekking/Hero"
import TrekkingCategories from "./Trekking/TrekkingCategories";

const Trekking = () => {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <TrekkingCategories />
            </main>
            <Footer />

        </div>
    )
}
export default Trekking;