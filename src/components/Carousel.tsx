import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/pages/components";
import Cta from "./cta";
import HoursText from "./HoursText";
import { BsPhone } from "react-icons/bs";

const Carousel = (props: any) => {
  const { data } = props;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="my-6 text-[#048554] font-bold text-4xl w-full mx-auto text-center">
        Jobs in this location
      </div>
      <Slider {...settings}>
        {data &&
          data.map((item: any, index: any) => {
            const {
              name,
              c_wageMin,
              c_wageMax,
              c_qualification,
              slug,
              landingPageUrl,
            } = item;
            return (
              <>
                <div key={index} className="p-4 border flex flex-row">
                  <div className="flex flex-col gap-3">
                    <div className="text-[#048554] font-bold h-12 text-xl">
                      {name}
                    </div>
                    <div>
                      {c_qualification.toString().replace("&lt;br&gt;", "")}
                    </div>
                    <div className="flex flex-row justify-between px-4 gap-x-4">
                      <a
                        href={landingPageUrl}
                        className="px-3 py-2 w-fit group  relative   bg-green-800 text-white font-bold hover:bg-orange-500 "
                      >
                        Apply
                      </a>
                      <a
                        href={`/${slug}`}
                        className="px-3 py-2 w-fit group  relative    bg-[#99cb39] text-[#083b3a] font-bold "
                      >
                        View Job
                        <div className="h-1 bg-teal-900 absolute bottom-0 left-0 transition-width duration-75 group-hover:w-full"></div>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </Slider>
    </>
  );
};

export default Carousel;
