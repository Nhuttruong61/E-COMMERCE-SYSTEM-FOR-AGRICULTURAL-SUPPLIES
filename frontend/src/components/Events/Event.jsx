import React from "react";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

function Event() {
  const { data } = useSelector((state) => state.event);
  return (
    <div className=" p-6 rounded-lg mb-12  md:px-[10%] ">
      <div className=" flex justify-center text-center items-center">
        <p className="  my-8 font-[700] md:text-[32px] text-[20px] border px-6 bg-[#4b8600] text-white rounded-[20px]">
          Sự kiện
        </p>
      </div>
      <div className="w-full grid shadow-lg">
        {data &&
          data.map((item, index) => <EventCard data={item} key={index} />)}
      </div>
    </div>
  );
}

export default Event;