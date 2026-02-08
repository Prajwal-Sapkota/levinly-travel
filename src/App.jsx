import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Tours from './pages/Tours'
import Trekking from './pages/Trekking'
import TrekkingRegion from './pages/Trekking/TrekkingRegion'
import TrekkingDetail from './pages/Trekking/TrekkingDetails'
import ToursRegion from './pages/Tours/ToursRegion'
import ToursDetail from './pages/Tours/ToursDetail'
import BlogDetail from './pages/Blog/BlogDetail'

function App() {

  return (
   <Routes>
    <Route path ="/" element={<Home/>} />
    <Route path='/tours' element = {<Tours/>} />
    <Route path='/tours/:regionSlug' element={<ToursRegion/>} />
    <Route path='/tours/:regionSlug/:tourSlug' element={<ToursDetail/>} />
    <Route path='/trekking' element = {<Trekking/>} />
    <Route path="/trekking/:regionSlug" element={<TrekkingRegion />} />
    <Route path="/trekking/:regionSlug/:trekSlug" element={<TrekkingDetail />} />
    <Route path='/about-us' element={<About/>} />
    <Route path='/blogs' element={<Blog/>} />
    <Route path='/blogs/:slug' element={<BlogDetail/>} />
    <Route path='/contact' element ={<Contact/>} />
   </Routes>
  )
}

export default App
