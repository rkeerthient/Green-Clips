// src/components/JobLocator.tsx

import * as React from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  StandardCard,
  AppliedFilters,
  StandardFacets,
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
} from "@yext/search-headless-react";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";
import JobResCard from "./JobResCard";
import MapPin from "./MapPin";
import { useEffect } from "react";

const JobLocator = (): JSX.Element => {
  const searchActions = useSearchActions();
  console.log("inn");

  const handleFilterSelect = (params: OnSelectParams) => {
    const locationFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: params.newFilter.fieldId,
        value: params.newFilter.value,
        matcher: Matcher.Equals,
      },
    };
    searchActions.setVertical("jobs");
    searchActions.setStaticFilters([locationFilter]);
    searchActions.executeVerticalQuery();
  };
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("jobs");
    searchActions.executeVerticalQuery();
  }, []);
  return (
    <>
      <div className="flex h-[calc(100vh-10px)] border my-4">
        <div className="flex w-1/3 flex-col">
          <div className="p-4">
            <span className="font-bold">Facets</span>

            <hr className="my-2" />
            <StandardFacets collapsible={true} defaultExpanded={false} />
            <AppliedFilters />
          </div>
          <div className="flex flex-col">
            <VerticalResults
              customCssClasses={{ verticalResultsContainer: "overflow-y-auto" }}
              CardComponent={JobResCard}
            />
          </div>
        </div>

        <div className="w-2/3">
          <MapboxMap
            mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAP_API_KEY!}
            PinComponent={MapPin}
          />
        </div>
      </div>
    </>
  );
};

export default JobLocator;
