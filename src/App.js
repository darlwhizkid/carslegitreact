import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Partners from './components/Partners';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
        <Partners />
        <Footer />
      </div>
    </Router>
  );
}

export default App;