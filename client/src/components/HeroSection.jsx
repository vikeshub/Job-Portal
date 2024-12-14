import { Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No.1 Job hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Serach , Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          corrupti aspernatur vel est repudiandae.
        </p>
        <div className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Jobs..."
            className="outline-none w-full"
          />
          <Button className="rounded-r-full bg-[#6A38C2]">
            <Search className="h-5 w-5"/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
