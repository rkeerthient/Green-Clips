// src/components/JobResCard.tsx

import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Location, { Coordinate } from "../types/locations";
import { RiDirectionFill } from "react-icons/ri";
import { BsScissors } from "react-icons/bs";
import Job from "../types/jobs";

const JobResCard: CardComponent<Job> = ({
  result,
}: CardProps<any>): JSX.Element => {
  const {
    name,
    datePosted,
    c_jobAddress,
    c_locationName,
    landingPageUrl,
    slug,
    c_wageMax,
    c_wageMin,
  } = result.rawData;

  return (
    <div className="p-6 border-b">
      <div className="flex flex-row items-center justify-between">
        <div>
          <a
            href={slug}
            className="mb-3 font-normal text-xl text-[#089f45] hover:border-b-2 border-[#089f45]"
          >
            {name}
          </a>
          <div>
            <p className="text-gray-400">posted on {formatDate(datePosted)}</p>
            <p className="text-[#089f45] text-sm italic">
              {c_wageMin.value && c_wageMax.value && parseInt(c_wageMax) >= 1
                ? `Pay - $${c_wageMin.value} - $${c_wageMax.value}`
                : `${
                    c_wageMin.value >= 1
                      ? `Pay - $${c_wageMin.value}+`
                      : `Pay - Competetive`
                  }`}
            </p>
          </div>
          <div className=" ">
            <p>{c_locationName}</p>
            <p>{c_jobAddress?.line1}</p>
            <p>
              {c_jobAddress?.city}, {c_jobAddress?.region}
              {c_jobAddress?.postalCode}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <a
            href={slug}
            className="px-5 py-2 w-fit group  relative   bg-green-800 text-white font-bold hover:bg-orange-500 "
          >
            View
          </a>
          <a
            href={landingPageUrl}
            className="px-4 py-2 w-fit group  relative   bg-[#99cb39] text-[#083b3a] font-bold "
          >
            Apply
            <div className="h-1 bg-teal-900 absolute bottom-0 left-0 transition-width duration-75 group-hover:w-full"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobResCard;

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) {
    return ""; // or handle the undefined case as desired
  }

  const date = new Date(dateString);
  const day: number = date.getDate();
  const month: string = date.toLocaleString("default", { month: "long" });
  const year: number = date.getFullYear();

  const daySuffix: string = getDaySuffix(day);
  const formattedDate: string = `${day}${daySuffix} ${month} ${year}`;

  return formattedDate;
};

const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  const lastDigit: number = day % 10;

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
