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

const HomePage = () => {
  const searchActions = useSearchActions();

  useEffect(() => {
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
          }}
        />
      </div>
    </>
  );
};

export default HomePage;
