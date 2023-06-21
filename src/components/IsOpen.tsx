import * as React from "react";
import { FiMapPin } from "react-icons/fi";

const IsOpen = ({ document }: any) => {
  const { hours, timezone } = document;

  const getStatus = (currentDay: any, currentTime: any, hours: any) => {
    if (hours[currentDay.toLowerCase()].isClosed)
      return {
        status: "Closed perm",
        text: `Closed`,
      };
    var startTime =
      (hours[currentDay.toLowerCase()].openIntervals[0].start.split(":")[0] ===
      "00"
        ? 24
        : hours[currentDay.toLowerCase()].openIntervals[0].start.split(
            ":"
          )[0]) *
        60 +
      hours[currentDay.toLowerCase()].openIntervals[0].start.split(":")[1];
    var endTime =
      (hours[currentDay.toLowerCase()].openIntervals[0].end.split(":")[0] ===
      "00"
        ? 24
        : hours[currentDay.toLowerCase()].openIntervals[0].end.split(":")[0]) *
        60 +
      hours[currentDay.toLowerCase()].openIntervals[0].end.split(":")[1];
    var currently = currentTime.split(":")[0] * 60 + currentTime.split(":")[1];
    if (
      hours[currentDay.toLowerCase()].openIntervals[0].start == "00:00" &&
      hours[currentDay.toLowerCase()].openIntervals[0].end == "23:59"
    )
      return { status: "Open", text: "Open 24 Hours" };
    else if (startTime < currently < endTime)
      return {
        status: "Open Now",
        text: `Closes at ${closeOrOpenTime(
          hours[currentDay.toLowerCase()].openIntervals[0].end
        )}`,
      };
    else
      return {
        status: "Closed",
        text: `Opens ${getTomorrow} at ${closeOrOpenTime(
          hours[currentDay.toLowerCase()].openIntervals[0].start
        )}`,
      };
  };
  const getTomorrow = () => {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toLocaleString("en-us", { weekday: "long" });
  };
  const closeOrOpenTime = (inpTime: any) => {
    let newTime = inpTime;
    if (inpTime.split(":")[0] === "00")
      newTime = `${newTime.split(":")[0].replace(/(.*)/, "24")}:${
        newTime.split(":")[1]
      }`;

    newTime =
      newTime.split(":")[0] >= 12 && newTime.split(":")[0] <= 23
        ? `${newTime.split(":")[0] - 12}:${newTime.split(":")[1]} PM`
        : `${newTime.split(":")[0] - 12}:${newTime.split(":")[1]} AM`;

    return newTime;
  };

  const getDayName = (hours: any, timezone: any) => {
    let currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: timezone,
    });
    let currentTime = timeNow();
    return getStatus(currentDay, currentTime, hours);
  };
  const timeNow = () => {
    var d = new Date(),
      h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
      m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    return h + ":" + m;
  };
  const res = getDayName(hours, timezone);
  console.log(res.status);

  return (
    <div className=" w-3/4 mx-auto bg-white py-12 px-6 flex flex-col gap-y-4 space-y-4">
      <div className="flex flex-col text-center justify-center gap-y-4 ">
        <div className="flex flex-row items-center justify-center">
          <FiMapPin size={60} color="#048554" />
          <div className="flex flex-col ">
            <p className="text-4xl font-light uppercase">Online</p>
            <p className="text-2xl font-bold">Check-in</p>
          </div>
        </div>
        {res.status.includes("Open") ? (
          <div className="w-fit px-8 py-4 border text-xl text-white font-bold bg-[#048554] mx-auto">
            Check In Now
          </div>
        ) : (
          <div className="w-fit px-8 py-4 border text-xl bg-black text-white font-bold  mx-auto">
            Find A Salon
          </div>
        )}
      </div>
      <div className="flex flex-row justify-center px-24">
        {res.status.includes("Open") ? (
          <>
            <div className="flex flex-col text-left">
              <div className="font-bold">Estimated wait:</div>
              <div className="w-3/4 text-sm">
                Check in online to add your name to the wait list before you
                arrive!
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-3xl font-bold">17</div>
              <div className="text-2xl font-bold">MIN</div>
            </div>
          </>
        ) : (
          <div className="font-bold">
            Online Check-in is currently unavailable at this salon.
          </div>
        )}
      </div>
    </div>
  );
};

export default IsOpen;
