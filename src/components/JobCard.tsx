import * as React from "react";
import Job from "../types/jobs";
import { CardProps } from "@yext/search-ui-react";
import { BsScissors } from "react-icons/bs";

const JobCard = (props: CardProps<Job>) => {
  const { result } = props;
  const {
    name,
    datePosted,
    c_jobAddress,
    c_locationName,
    landingPageUrl,
    slug,
  } = result.rawData;

  return (
    <>
      <div className="px-2 py-8 border-b">
        <div className="flex flex-row items-center justify-between">
          <div>
            <a
              href={slug}
              className="mb-3 font-normal text-2xl text-[#089f45] hover:border-b-2 border-[#089f45]"
            >
              {name}
            </a>
            <div>
              <p className="text-gray-400">
                posted on {formatDate(datePosted)}
              </p>
            </div>
            <div className="text-lg">
              <p>{c_locationName}</p>
              <p>{c_jobAddress?.line1}</p>
              <p>
                {c_jobAddress?.city}, {c_jobAddress?.region}{" "}
                {c_jobAddress?.postalCode}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="bg-gray-200 rounded-full p-4   mx-auto">
              <BsScissors size={60} color="#089f45" />
            </div>
            <p className=" mx-auto text-sm">SAVE JOB</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;

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
