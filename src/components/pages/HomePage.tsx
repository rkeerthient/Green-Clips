import { useSearchActions } from "@yext/search-headless-react";
import {
  ResultsCount,
  UniversalResults,
  SpellCheck,
  DirectAnswer,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import FAQCard from "../FAQCard";
import JobCard from "../JobCard";
import PromoCard from "../PromoCard";

const HomePage = () => {
  const searchActions = useSearchActions();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setUniversal();
    searchActions.executeUniversalQuery();
  }, []);
  return (
    <>
      <div className="max-w-7xl mx-auto mt-4">
        <SpellCheck />
        <DirectAnswer />
        <ResultsCount />
        <UniversalResults
          customCssClasses={{ universalResultsContainer: "w-full" }}
          verticalConfigMap={{
            faqs: {
              CardComponent: FAQCard,
              viewAllButton: true,
            },
            jobs: {
              CardComponent: JobCard,
              viewAllButton: true,
            },
            promo: {
              CardComponent: PromoCard,
            },
          }}
        />
      </div>
    </>
  );
};

export default HomePage;
