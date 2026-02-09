import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BlogData from "./Blog/BlogsData";
import Hero from "./Blog/Hero"

const Blog = () => {
    return (
        <div className="overfloe-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <BlogData />
            </main>
            <Footer />
        </div>
    )
}
export default Blog;