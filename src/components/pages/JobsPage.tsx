import {
  Direction,
  SortBy,
  SortType,
  useSearchActions,
} from "@yext/search-headless-react";
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
import JobCard from "../JobCard";

const JobsPage = () => {
  const searchActions = useSearchActions();

  useLayoutEffect(() => {
    searchActions.setVertical("jobs");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="w-64 shrink-0 mr-5 mt-4">
          <StandardFacets />
        </div>
        <div className="flex-grow">
          <div className="flex flex-col items-baseline">
            <ResultsCount />
            <AppliedFilters />
          </div>
          <VerticalResults
            CardComponent={JobCard}
            customCssClasses={{
              verticalResultsContainer: `max-w-screen-xl !-my-8`,
            }}
          />
          <div className="mt-16">
            <Pagination />
            <LocationBias />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsPage;
