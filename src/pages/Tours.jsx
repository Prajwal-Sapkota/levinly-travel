import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "./Tours/Hero"
import ToursCategories from "./Tours/ToursCategories";

const Tours = () => {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <ToursCategories />
            </main>
            <Footer />
        </div>
    )
}
export default Tours;