import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { useState } from "react";
import Faq from "../types/faqs";
import RTF from "./RTF";

const FAQCard = (props: CardProps<Faq>): JSX.Element => {
  const { result } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full border border-gray-300 p-4 my-4 rounded-md">
      <div className="text-xl">
        <div onClick={() => setIsActive(!isActive)}>
          <div className="text-primary-text-color text-2xl hover:cursor-pointer dark:text-dark_primary">
            <span>{result.name}</span>
            <span style={{ float: "right" }}>{isActive ? "-" : "+"}</span>
          </div>
        </div>
        {isActive && (
          <div className="!text-lg text-faq-text-color mt-3 dark:text-dark_primary">
            <RTF>{result.rawData.answer}</RTF>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQCard;
