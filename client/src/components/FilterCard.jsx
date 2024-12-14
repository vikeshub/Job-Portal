import React from "react";
import { RadioGroup } from "./ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Banglore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "Mern Stack Developer",
      "Python developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "80k-1L", "5-6L", "10-14L", "15+LPA"],
  },
];
const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      <RadioGroup>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => {
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} />
                  <Label>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
