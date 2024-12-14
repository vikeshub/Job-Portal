import React from "react";
import Navbar from "./ui/shared/Navbar";
import Job from "./Job";

const randomJobs = [1, 2, 3, 4, 5, 4, 56, 6, 77, 7];
const Browse = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results({randomJobs.length})
        </h1>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {randomJobs.map((item, index) => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
