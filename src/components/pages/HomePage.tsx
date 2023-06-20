import { useSearchActions, useSearchState } from "@yext/search-headless-react";
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
import { Image } from "@yext/pages/components";

const HomePage = (_site: any) => {
  console.log(JSON.stringify(_site));
  const { photoGallery } = _site._site;
  const searchActions = useSearchActions();
  const results = useSearchState((state) => state.universal.verticals);
  console.log(photoGallery);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setUniversal();
    searchActions.executeUniversalQuery();
  }, []);
  return (
    <>
      {results?.length ? (
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
      ) : (
        <div className="flex flex-col space-y-5">
          <Image image={photoGallery[0]}></Image>
          <Image image={photoGallery[1]}></Image>
          <Image image={photoGallery[2]}></Image>
          <Image image={photoGallery[3]}></Image>
          <Image image={photoGallery[4]}></Image>
          <Image image={photoGallery[5]}></Image>
        </div>
      )}
    </>
  );
};

export default HomePage;
