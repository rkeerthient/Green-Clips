import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Ce_promo from "../types/promo";
import { Image } from "@yext/pages/components";
import RTF from "./RTF";

const PromoCard = (props: CardProps<Ce_promo>): JSX.Element => {
  const { result } = props;
  const { primaryPhoto, richTextDescription, name, c_primaryCTA } =
    result.rawData;
  return (
    <div className="w-full border border-gray-300 p-12 my-4 ">
      <div className=" flex flex-row gap-8">
        <div className="w-1/2 flex justify-center">
          <div className="flex flex-col justify-center space-y-8 mx-auto text-center">
            <div className="text-[#089f45] font-bold text-2xl">{name}</div>
            <div>
              <RTF>{richTextDescription}</RTF>
            </div>
            <a
              href={c_primaryCTA!.link}
              className="mx-auto px-6 py-2 w-fit group  relative text-lg  bg-[#99cb39] text-[#083b3a] font-bold "
            >
              {c_primaryCTA!.label}
              <div className="h-1 bg-teal-900 absolute bottom-0 left-0 transition-width duration-75 group-hover:w-full"></div>
            </a>
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <Image image={primaryPhoto!}></Image>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
