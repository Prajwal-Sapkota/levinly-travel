import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ContactForm from "./Contact/ContactForm";
import Hero from "./Contact/Hero"

const Contact = () => {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <ContactForm />
            </main>
            <Footer />
        </div>
    )
}
export default Contact;