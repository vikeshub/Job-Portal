import React from "react";
import Navbar from "./ui/shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./ui/shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  );
};

export default Home;
