import {
  Direction,
  SortBy,
  SortType,
  useSearchActions,
  useSearchState,
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
import JobCard from "../JobCard";

const JobsPage = ({ sendDataToParent }: any) => {
  const searchActions = useSearchActions();
  const jobResults = useSearchState((state) => state.vertical.results) || [];
  const loadingState =
    useSearchState((state) => state.searchStatus.isLoading) || true;

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("jobs");
    searchActions.executeVerticalQuery();
  }, []);
  useEffect(() => {
    if (loadingState && jobResults.length >= 1) {
      let mEntity: any = [];
      jobResults.map((item: any, index: any) => {
        const {
          name,
          c_jobAddress,
          datePosted,
          c_richDescription,
          c_qualification,
          landingPageUrl,
        } = item;
        mEntity.push({
          "@type": "ListItem",
          position: parseInt(index) + 1,
          item: {
            "@type": "JobPosting",
            baseSalary: {
              "@type": "MonetaryAmount",
              currency: "",
              value: {
                "@type": "QuantitativeValue",
                unitText: "",
              },
            },
            datePosted,
            description: c_richDescription,
            employmentType: "cba01f96-f6ad-dd11-a667-000c290d3d0d",
            identifier: "98046b53-256f-4097-aad0-dcbb6d8af5a1",
            industry: "Service",
            qualifications: c_qualification,
            title: name,
            url: landingPageUrl,
            workHours: "0505",
            hiringOrganization: {
              "@type": "Organization",
              name: "Great Clips",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: c_jobAddress?.city,
                addressRegion: c_jobAddress?.region,
                addressCountry: "",
                streetAddress: c_jobAddress?.line1,
                postalCode: c_jobAddress?.postalCode,
              },
            },
          },
        });
      });
      sendDataToParent({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: mEntity,
      });
    }
  }, [jobResults, loadingState]);
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
