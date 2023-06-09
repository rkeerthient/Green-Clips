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
import { useEffect } from "react";
import FAQCard from "../FAQCard";
import { SortDropdown } from "../SortDropdown";

const FAQsPage = () => {
  const searchActions = useSearchActions();
  const sortConfig: Record<string, { label: string; sortBy: SortBy }> = {
    alpha_asc: {
      label: "Name: A-Z",
      sortBy: {
        field: "name",
        direction: Direction.Ascending,
        type: SortType.Field,
      },
    },
    alpha_desc: {
      label: "Name: Z-A",
      sortBy: {
        field: "name",
        direction: Direction.Descending,
        type: SortType.Field,
      },
    },
    relevance: {
      label: "Relevance",
      sortBy: {
        type: SortType.Relevance,
      },
    },
  };
  useEffect(() => {
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
