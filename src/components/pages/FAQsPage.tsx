import { useSearchActions } from "@yext/search-headless-react";
import {
  StandardFacets,
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
} from "@yext/search-ui-react";
import * as React from "react";
import { useLayoutEffect } from "react";
import FAQCard from "../FAQCard";

const FAQsPage = () => {
  const searchActions = useSearchActions();
  useLayoutEffect(() => {
    searchActions.setVertical("faqs");
    searchActions.executeVerticalQuery();
  }, []);
  return (
    <>
      <div className="flex mt-4">
        <div className="w-64 shrink-0 mr-5 mt-4">
          <StandardFacets />
        </div>
        <div className="flex-grow">
          <div className="flex flex-col items-baseline">
            <ResultsCount />
            <AppliedFilters />
          </div>
          <VerticalResults
            CardComponent={FAQCard}
            customCssClasses={{
              verticalResultsContainer: `max-w-screen-xl`,
            }}
          />
          <Pagination />
          <LocationBias />
        </div>
      </div>
    </>
  );
};

export default FAQsPage;
