import React from "react";
import Header from "../components/Header";
import CTA from "../components/LandingPage/CTA";
import Features from "../components/LandingPage/Features";
import Footer from "../components/LandingPage/Footer";
import Hero from "../components/LandingPage/Hero";
import Testimonials from "../components/LandingPage/Testimonials";

const  Main=()=>{
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
export default Main;