import Header from "./components/Header";
import Hero from "./components/LandingPage/Hero";
import Features from "./components/LandingPage/Features";
import Testimonials from "./components/LandingPage/Testimonials";
import CTA from "./components/LandingPage/CTA";
import Footer from "./components/LandingPage/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
